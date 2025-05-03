import { Request, Response } from 'express';
import { LLMService } from '../services/llmService';
import { GenerateContentRequest, GenerateContentResponse } from '../types/llm.d';
import { chooseNextAction } from '../services/gameIntelligenceService';

export const textToGameAnalysis = async (req: Request, res: Response) => {
    try {
        // TODO: separate req from client to current game state
        // const request: GenerateContentRequest = {
        //     provider: 'deepseek',
        //     prompt: req.body.text,
        //     type: 'text'
        // };
        
        const result = await chooseNextAction(currentBoard, currentDice, currentSymbol);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Analysis failed' });
    }
};

// export async function generateTextFromString(prompt: string, type: string = 'text', temperature: number = 0.8): Promise<GenerateContentResponse | undefined> {
//     try {
//         const request: GenerateContentRequest = {
//             provider: 'deepseek',
//             prompt: prompt,
//             type: type,
//             temperature: temperature
//         };
        
//         const llmServiceInst = new LLMService();
//         const result = await llmServiceInst.generateContent(request);

//         return result;
//     } catch (error) {
//         console.log("Text Generation error: ", error);
//         throw new Error('Text generation from string failed');
//     }
// }
