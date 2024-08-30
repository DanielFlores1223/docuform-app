import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

interface Options extends Partial<OperationObject> {
    bodyInterface: string;
    responseInterface: string;
}

export const ApiRestEndpointDescription = (options: Options) => {
    const { bodyInterface, responseInterface, ...rest } = options;

    const description = `
        package: global-interfaces
            **Interfaces**: 
            body: ${bodyInterface}
            response: ${responseInterface}
    `;

    return applyDecorators(
        ApiOperation({
            description,
            ...rest
        }),
    );
};
