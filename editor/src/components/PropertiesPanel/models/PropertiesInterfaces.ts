export interface PropertyPanel {
  id: string;
  name: string;
  type: string;
  items: Array<any>;
}

const PropertiesPanel = [
  {
    id: 'variable',
    type: 'text',
    name: 'Variable',
    items: [],
  } as PropertyPanel,
  {
    id: 'placeholder',
    type: 'text',
    name: 'Placeholder',
    items: [],
  } as PropertyPanel,
  {
    id: 'label',
    type: 'text',
    name: 'Label',
    items: [],
  } as PropertyPanel,
  {
    id: 'description',
    type: 'textarea',
    name: 'Description',
    items: [],
  } as PropertyPanel,
  {
    id: 'validation',
    type: 'text',
    name: 'Validation',
    items: [],
  } as PropertyPanel,
  {
    id: 'validationMessage',
    type: 'text',
    name: 'Validation message',
    items: [],
  } as PropertyPanel,
  {
    id: 'mask',
    type: 'text',
    name: 'Mask',
    items: [],
  } as PropertyPanel,
  {
    id: 'maxLength',
    type: 'text',
    name: 'Max length',
    items: [],
  } as PropertyPanel,
  {
    id: 'textTransform',
    type: 'dropdown',
    name: 'Text Transform',
    items: [
      {
        text: 'None',
        id: 'none',
      },
      {
        text: 'Lowercase',
        id: 'lowercase',
      },
      {
        text: 'Uppercase',
        id: 'uppercase',
      },
      {
        text: 'Capital Phrase',
        id: 'capital',
      },
      {
        text: 'Title case',
        id: 'title',
      },
    ],
  } as PropertyPanel,
  {
    id: 'required',
    type: 'checkbox',
    name: 'Required',
    items: [],
  } as PropertyPanel,
  {
    id: 'readOnly',
    type: 'checkbox',
    name: 'Variable',
    items: [],
  } as PropertyPanel,
  {
    id: 'multi',
    type: 'checkbox',
    name: 'Multi',
    items: [],
  } as PropertyPanel,
  {
    id: 'trim',
    type: 'checkbox',
    name: 'Trim',
    items: [],
  } as PropertyPanel,
  {
    id: 'restrictMaxLength',
    type: 'checkbox',
    name: 'Restrict Max Length',
    items: [],
  } as PropertyPanel,
];
export default PropertiesPanel;
