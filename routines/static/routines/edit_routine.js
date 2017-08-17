Sortable.create(foo, {group: 'foo',animation: 100});                           
Sortable.create(bar, {group: 'bar',animation: 100});                           
var editableList = Sortable.create(wo_form_set, {
    filter: '.js-remove',
    onFilter: function (evt) {
            var el = editableList.closest(evt.item); // get dragged item
            el && el.parentNode.removeChild(el);
        }
    });
Sortable.create(qux, {group: {name: 'qux', put: ['foo', 'bar']},animation: 100});
