import type { App } from 'vue';

import {AButton} from '@/components/button/index'


import {Modal, Table, Menu, Input, Form,Card, Checkbox, Radio,Select} from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css';

export function setupAntd(app: App<Element>) {
    app.component('a-button', AButton)

    app.use(Form)
        .use(Input)
        .use(Modal)
        .use(Table)
        .use(Menu)
        .use(Card)
        .use(Checkbox)
        .use(Select)
        .use(Radio);
}
