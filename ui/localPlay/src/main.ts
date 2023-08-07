import { attributesModule, classModule, init } from 'snabbdom';
import { Ctrl } from './ctrl';
import view from './view';
import { LocalPlayOpts } from './interfaces';

const patch = init([classModule, attributesModule]);

export async function initModule(opts: LocalPlayOpts) {
  // make a StrongSocket
  const ctrl = new Ctrl(opts, () => {});
  ctrl;
  const blueprint = view(ctrl);
  const element = document.querySelector('#bot-view') as HTMLElement;
  element.innerHTML = '';
  let vnode = patch(element, blueprint);

  function redraw() {
    vnode = patch(vnode, view(ctrl));
  }
  redraw();
}
