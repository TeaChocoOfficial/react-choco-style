//-Path: "react-choco-style/src/components/CBox.stories.ts"
import { CBox } from './CBox';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'choco components/CBox',
    component: CBox,
    tags: ['autodocs'],
    argTypes: {
        bgClr: { control: 'color', name: 'background color' },
    },
} satisfies Meta<typeof CBox>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
    args: {
        p: 16,
        wh: 100,
        borR: 4,
        clr: 'text',
        bgClr: 'paper',
        children: 'Hello World!',
    },
};
