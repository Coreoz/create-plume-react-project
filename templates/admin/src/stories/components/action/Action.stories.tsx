import { ActionButton, ActionsContainer } from '@components/theme/action/Actions';
import ActionStyle from '@lib/plume-admin-theme/action/ActionStyle';
import type { Meta, StoryObj } from '@storybook/react';

// Correctly typed meta export for Storybook
const meta: Meta<typeof ActionButton> = {
  title: 'Components/Action',
  component: ActionButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// ActionButton Stories
export const PrimaryButton: Story = {
  render: () => (
    <ActionsContainer>
      <ActionButton>Primary Button</ActionButton>
    </ActionsContainer>
  ),
};

export const SecondaryButton: Story = {
  render: () => (
    <ActionsContainer>
      <ActionButton style={ActionStyle.SECONDARY}>Secondary Button</ActionButton>
    </ActionsContainer>
  ),
};

export const DangerButton: Story = {
  render: () => (
    <ActionsContainer>
      <ActionButton style={ActionStyle.DANGER}>Danger Button</ActionButton>
    </ActionsContainer>
  ),
};

export const OutlinedButton: Story = {
  render: () => (
    <ActionsContainer>
      <ActionButton variant="outlined">Outlined Button</ActionButton>
    </ActionsContainer>
  ),
};

export const IconButton: Story = {
  render: () => (
    <ActionsContainer>
      <ActionButton icon="star">Button with Icon</ActionButton>
    </ActionsContainer>
  ),
};

export const LoadingButton: Story = {
  render: () => (
    <ActionsContainer>
      <ActionButton isLoading>Loading Button</ActionButton>
    </ActionsContainer>
  ),
};

export const DisabledButton: Story = {
  render: () => (
    <ActionsContainer>
      <ActionButton disabled>Disabled Button</ActionButton>
    </ActionsContainer>
  ),
};
