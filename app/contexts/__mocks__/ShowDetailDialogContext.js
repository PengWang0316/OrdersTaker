/**
 * Mock ShowDetailDialogContext for test.
 */

import context from '../ShowDetailDialogContextTestHelper';

const Context = ({
  Consumer: props => props.children(context)
});
export default Context;
