/**
 * @file Tabs
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';
import css from '../common/util/css';
import {TAB_INIT, TAB_ACTIVE, TAB_DISPOSE} from './constant';

export default san.defineComponent({

    template: `
        <div class="sm-tabs">
            <slot />
            <div class="sm-tabs-bar" style="{{barStyle}}"/>
        </div>
    `,

    initData() {
        return {
            items: []
        };
    },

    inited() {
        this.items = [];
    },

    disposed() {
        this.items = null;
    },

    addItem(itemComponent) {
        this.items.push(itemComponent);
        this.data.push('items', itemComponent.data.get('value'));
    },

    removeItem(itemComponent) {
        this.items = this.items.filter(item => item === itemComponent);
        this.data.remove('items', itemComponent.data.get('value'));
    },

    computed: {
        barStyle() {

            let items = this.data.get('items');
            let value = this.data.get('value');
            let total = items.length;
            let activeIndex = items.findIndex(
                item => item === value
            );

            if (activeIndex < 0) {
                activeIndex = 0;
            }

            return css({
                transform: `translateX(${activeIndex * 100}%)`,
                width: `${1 / total * 100}%`
            });

        }
    },

    messages: {
        [TAB_INIT]({target}) {
            this.addItem(target);
        },

        [TAB_ACTIVE]({target}) {
            this.data.get('items').forEach(child => {
                let active = child === target;
                child.data.set('active', active);
                if (active) {
                    this.data.set('value', target.data.get('value'));
                }
            });
        },

        [TAB_DISPOSE]({target}) {
            this.removeItem(target);
        }
    }

});
