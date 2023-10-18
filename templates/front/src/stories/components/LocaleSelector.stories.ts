import type { Meta, StoryObj } from '@storybook/react';
import LocaleSelector from '@components/theme/LocaleSelector';
import { Locale } from '@lib/locale-resolver/LocaleResolver';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof LocaleSelector> = {
  title: 'Components/LocaleSelector',
  component: LocaleSelector,
  parameters: {
    // Optional parameter to center the component in the Canvas.
    // More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry:
  // https://storybook.js.org/docs/react/writing-docs/autodocs
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

const LOCAL_FR: Locale = { code: 'fr', name: 'Français' } as Locale;
const LOCAL_EN: Locale = { code: 'en', name: 'English' } as Locale;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Test: Story = {
  args: {
    availableLocales: [LOCAL_FR, LOCAL_EN],
    onLocaleSelected: () => {
      // We can't use action here because it's a sample component
      // eslint-disable-next-line no-console
      console.log('btn click');
    },
    currentLocale: LOCAL_FR,
  },
};
