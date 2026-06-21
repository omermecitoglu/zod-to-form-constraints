import type { $ZodCheckGreaterThanDef, $ZodCheckLessThanDef, $ZodCheckMaxLengthDef, $ZodCheckMinLengthDef, $ZodType } from "zod/v4/core";

type ZodSchemaInformation = {
  type: string,
  isOptional: boolean,
  isNullable: boolean,
  min?: number,
  max?: number,
};

export function deconstructureZodType(schema: $ZodType, info?: Omit<ZodSchemaInformation, "type">): ZodSchemaInformation {
  let min: number | undefined;
  let max: number | undefined;
  for (const _check of schema._zod.def.checks ?? []) {
    switch (_check._zod.def.check) {
      case "min_length": {
        const { minimum } = _check._zod.def as $ZodCheckMinLengthDef;
        min = minimum;
        break;
      }
      case "max_length": {
        const { maximum } = _check._zod.def as $ZodCheckMaxLengthDef;
        max = maximum;
        break;
      }
      case "greater_than": {
        const { value } = _check._zod.def as $ZodCheckGreaterThanDef;
        if (typeof value === "number") {
          min = value;
        }
        break;
      }
      case "less_than": {
        const { value } = _check._zod.def as $ZodCheckLessThanDef;
        if (typeof value === "number") {
          max = value;
        }
        break;
      }
      /* default: { // for debug
        console.log(_check._zod.def);
        break;
      } */
    }
  }
  const {
    isOptional = false,
    isNullable = false,
  } = info ?? {};
  switch (schema._zod.def.type) {
    case "optional": {
      if ("unwrap" in schema && typeof schema.unwrap === "function") {
        return deconstructureZodType(schema.unwrap(), { isOptional: true, isNullable, min, max });
      }
      /* v8 ignore next */
      throw new Error("The provided Zod schema is of type 'optional', but it does not have an 'unwrap' method.");
    }
    case "nullable": {
      if ("unwrap" in schema && typeof schema.unwrap === "function") {
        return deconstructureZodType(schema.unwrap(), { isOptional, isNullable: true, min, max });
      }
      /* v8 ignore next */
      throw new Error("The provided Zod schema is of type 'nullable', but it does not have an 'unwrap' method.");
    }
    case "string":
      return { type: "string", isOptional, isNullable, min, max };
    case "number":
      return { type: "number", isOptional, isNullable, min, max };
    case "boolean":
      return { type: "boolean", isOptional, isNullable, min, max };
    default:
      return { type: "unknown", isOptional, isNullable, min, max };
  }
}
