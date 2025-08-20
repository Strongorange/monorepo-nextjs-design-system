import type { Meta, StoryObj } from "@storybook/react-vite";
import { DsButton } from "@strongorange/ds-ui";

const meta = {
  title: "UI/DsButton",
  component: DsButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "assistive"],
    },
    size: {
      control: { type: "select" },
      options: ["medium", "small", "large", "xlarge"],
    },
    fullWidth: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof DsButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "DsButton",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "DsButton",
  },
};

export const Assistive: Story = {
  args: {
    variant: "assistive",
    children: "DsButton",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    children: "DsButton",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    children: "DsButton",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    children: "DsButton",
  },
};

export const XLarge: Story = {
  args: {
    size: "xlarge",
    children: "DsButton",
  },
};
