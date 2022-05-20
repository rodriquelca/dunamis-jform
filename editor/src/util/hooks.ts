import {
  buildJsonSchema,
  buildEditorJsonSchema,
  SchemaElement,
} from '../model';
import {
  buildUiSchema,
  EditorUISchemaElement,
  buildEditorUiSchema,
} from '../model/uischema';
const doBuildJsonSchema = (schema: SchemaElement | undefined) =>
  schema ? buildJsonSchema(schema) : schema;

const doBuildUiSchema = (uiSchema: EditorUISchemaElement | undefined) =>
  uiSchema ? buildUiSchema(uiSchema) : undefined;

const doBuildEditorJsonSchema = (schema: SchemaElement | undefined) =>
  schema ? buildEditorJsonSchema(schema) : schema;

const doBuildEditorUiSchema = (uiSchema: EditorUISchemaElement | undefined) =>
  uiSchema ? buildEditorUiSchema(uiSchema) : undefined;
/**
 * Ui Schema for export
 */
export const useExportUiSchema = (editorUiSchema: EditorUISchemaElement) => {
  return useTransform(editorUiSchema, doBuildUiSchema);
};
/**
 * Json Schema for export
 */
export const useExportSchema = (editorSchema: SchemaElement) => {
  return useTransform(editorSchema, doBuildJsonSchema);
};

export const useEditorSchema = (editorSchema: SchemaElement) => {
  return useTransform(editorSchema, doBuildEditorJsonSchema);
};

export const useEditorUiSchema = (editorSchema: SchemaElement) => {
  return useTransform(editorSchema, doBuildEditorUiSchema);
};
/**
 * Transforms the given element whenever it changes.
 */
export const useTransform = <T1, T2>(
  element: T1,
  transform: (el: T1) => T2
) => {
  return transform(element);
};
