import type { Meta, StoryObj } from '@storybook/react';
import LocaleSelector from "@components/theme/LocaleSelector";
import { Locale } from "@lib/locale-resolver/LocaleResolver";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/LocaleSelector',
  component: LocaleSelector,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    availableLocales: { control: 'array' },
    onLocaleSelected: { action: 'onLocaleSelected' },
    currentLocale: { control: 'text' },
  },
} satisfies Meta<typeof LocaleSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const local_FR = { code: 'fr', name: 'Français' } as Locale;
const local_EN = { code: 'en', name: 'English' } as Locale;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Test: Story = {
  args: {
    availableLocales: [local_FR, local_EN],
    onLocaleSelected: () => {
      console.log('btn click');
    },
    currentLocale: local_FR,
  },
};
