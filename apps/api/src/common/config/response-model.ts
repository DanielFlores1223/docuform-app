import { InternalServerErrorException } from "@nestjs/common";

export class ResponseModel<T> {
    private _attrs: object;

    private _getMapError() {
        return new InternalServerErrorException(`You must call mapAttributes function in you Response Model`);
    }

    mapAttributes(instance: ResponseModel<T>, attrs: object) {
        Object.keys(attrs).forEach(key => {
            const existProperty = Object.keys(instance).find(keyClass => keyClass === key);

            if(!existProperty)
                throw new InternalServerErrorException(`${instance.constructor.name} must not have '${key}' attribute`);

            instance[key] = attrs[key]
        });

        this._attrs = attrs;
    }

    toJSON() {
        if(!this._attrs)
            throw this._getMapError();

        return this._attrs as T;
    }
}
