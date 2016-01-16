export default {
  /* Prop `itemSearchPredicate` is only required (and it should be of type
   * `function`) if prop `showItemSearch` is set to `true`.
   */
  itemSearchPredicate(props, propName, componentName) {
    if (props.showItemSearch
      && !(props[propName] && (typeof props[propName] === 'function'))) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`,`
          + ` expected a \`function\`.`
      );
    }
  }
};
