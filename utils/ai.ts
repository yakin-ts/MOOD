import { OpenAI} from 'langchain/llms/openai'
import { StructuredOutputParser } from "langchain/output_parsers"
import { PromptTemplate } from "langchain/prompts"
import  {Document} from 'langchain/document'
import  { loadQARefineChain} from 'langchain/chains'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import  { MemoryVectorStore} from 'langchain/vectorstores/memory'
import z from 'zod'

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      sentiment: z.string().describe("the mood of the person who wrote the journal entry."),
      summary: z.string().describe("quick summary of the entire entry."),
      subject: z.string().describe("the subject of the journal entry."),
      negative: z
        .boolean()
        .describe("is the journal entry negative? (i.e. does it contain negative emotions?)."),
      color: z.string().describe(
        `a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue \
  representing happiness.`
      ),
      sentimentScore: z
        .number()
        .describe(
          `sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely \
  negative, 0 is neutral, and 10 is extremely positive.`
        ),
    })
  );

// promt template


const getPrompt = async (content) => {
    const formatted_instruction = parser.getFormatInstructions()
    const prompt = new PromptTemplate({
        template: `Analyze the following journal entry. Follow the instructions and format your \
    response to match the format instructions, no matter what! \n
    {format_instructions} \n
    {entry}`,
        inputVariables: ["entry"],
        partialVariables: { formatted_instruction },
      });
    

    const input = prompt.format({ entry: content });

    return input

}

export const analyze  = async (content) => {
    const prompt = await getPrompt(content)
    const model = new OpenAI({temperature:0, modelName: process.env.OPENAI_MODEL_NAME})
    const result = await model.call(prompt)
    
    try {
        const output = parser.parse(result)
        return output
    } 
    catch {
      
}

}



export const qa =  async(question,entries) => {

  const docs = entries.map(entry => {
    return new Document({
      pageContent: entry.content,
      metadata : {
        id: entry.id,
        createdAt: entry.createdAt,
      }
    })
  })

  const model = new OpenAI({temperature:0, modelName: process.env.OPENAI_MODEL_NAME})
  const chain = loadQARefineChain(model)
  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)
  const res = await chain.call({
    input_documents: relevantDocs,
    question,
  })

  return res.output_text

}