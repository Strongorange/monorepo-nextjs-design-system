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
      options: [
        "primary",
        "secondary",
        "destructive",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon"],
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

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "DsButton",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "DsButton",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "DsButton",
  },
};
