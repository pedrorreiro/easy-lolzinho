// src/decorators/requireConfig.ts

import { checkConfig } from "../config";
import { ZhonyaError } from "../errors/ZhonyaError";

export function RequireInit() {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ): TypedPropertyDescriptor<any> {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (!checkConfig()) {
        throw new ZhonyaError("Zhonya client must be initialized before use");
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
