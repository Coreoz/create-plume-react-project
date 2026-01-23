import LocaleSelector from '@components/theme/LocaleSelector';
import { Locale } from '@lib/locale-resolver/LocaleResolver';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof LocaleSelector> = {
  title: 'Components/LocaleSelector',
  component: LocaleSelector,
  parameters: {
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry:
  // https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    availableLocales: { control: 'object' },
    onLocaleSelected: { action: 'onLocaleSelected' },
    currentLocale: { control: 'object' },
  },
} satisfies Meta<typeof LocaleSelector>;

type Story = StoryObj<typeof meta>;

const LOCAL_FR: Locale = { code: 'fr', name: 'Français' };
const LOCAL_EN: Locale = { code: 'en', name: 'English' };

export const Default: Story = {
  args: {
    availableLocales: [LOCAL_FR, LOCAL_EN],
    currentLocale: LOCAL_FR,
    // Note: You no longer need to manually console.log if you use the 'action' in argTypes.
    // Storybook will automatically intercept this if it's passed as an arg.
  },
};

export default meta;
