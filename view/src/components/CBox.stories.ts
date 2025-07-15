//-Path: "react-choco-style/view/src/components/CBox.stories.ts"
import { CBox } from '@teachoco-official/react-choco-style';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CBox> = {
    title: 'choco components/CBox',
    component: CBox,
    tags: ['autodocs'],
    argTypes: {
        bgClr: { control: 'color', name: 'background color' },
    },
};

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
