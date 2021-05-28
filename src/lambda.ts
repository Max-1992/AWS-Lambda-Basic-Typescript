// Interface AWS Lambdas
import { Handler, Context } from 'aws-lambda';

// Interface
import { IRequestEvent, IResponse } from './interface';


export const lambda: Handler<IRequestEvent, IResponse> = async (event: IRequestEvent, context: Context): Promise<IResponse> => {
    const saludar: string = 'Hola Typescript'
    console.log(saludar);

    const response: IResponse = {
        statusCode: 200,
        body: JSON.stringify(event)
    }

    return response;
}