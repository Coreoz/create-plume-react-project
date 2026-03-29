import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof ${NAME}>;

export const Default: Story = {
  render: () => (
    <${NAME} />
  ),
};

const meta: Meta<typeof ${NAME}> = {
  component: ${NAME},
};

export default meta;
