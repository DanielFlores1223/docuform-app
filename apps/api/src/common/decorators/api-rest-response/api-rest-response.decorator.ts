import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ApiRestResponseModel } from 'src/common/responses';

interface Options <T> {
    genericType?: T,
    description?: string,
    array?: boolean
}

export const ApiRestResponse = <GenericType extends Type<unknown>>(options: Options<GenericType>) => {
    const { genericType, description = 'Ok', array } = options;
    
    if(!genericType)
        return applyDecorators(
            ApiOkResponse({
                description,
                type: ApiRestResponseModel
            })
        );

    let schema: SchemaObject & Partial<ReferenceObject> = {
        $ref: getSchemaPath(ApiRestResponseModel),
        properties: { result: { $ref: getSchemaPath(genericType) } }
    }

    if(array) { 
        schema = {
            allOf: [
                { $ref: getSchemaPath(ApiRestResponseModel) },
                {
                    properties: {
                        result: {
                            type: 'array',
                            items: { $ref: getSchemaPath(genericType) }
                        }
                    }
                }
            ]
        }
    }

    return applyDecorators(
        ApiExtraModels(ApiRestResponseModel, genericType),
        ApiOkResponse({
            description,
            schema,
        })
    );
}
    
