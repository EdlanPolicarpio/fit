//Create Sortable for workouts
var editableList = Sortable.create(wo_form_set, {
    filter: '.js-remove',
    onFilter: function (evt) {
            var el = editableList.closest(evt.item); // get dragged item
            var form = el.parentNode;
            form.removeChild(el);
    }
});
//Function for creating a new form
function add_form(appendTo, id, template){
    var table_meta = id + '-TOTAL_FORMS';
    var form_idx = $(table_meta).val();
    var index = form_idx;
    var wo_template = `<!--new_wo_form --!>
    <div id="workout"><table>
    <p class="js-remove"> remove </p>
    <tr>
      <th><label for="id_workout_set-${index}-name">Name:</label></th>
      <td><input type="text" name="workout_set-${index}-name" maxlength="100" id="id_workout_set-${index}-name" /></td>
    </tr>
    <tr>
      <th><label for="id_workout_set-${index}-day">Day:</label></th>
      <td><input type="number" name="workout_set-${index}-day" value="0" min="0" id="id_workout_set-${index}-day" /></td>
    </tr>
    <tr>
      <th><label for="id_workout_set-${index}-DELETE">Delete:</label></th>
      <td>
        <input type="checkbox" name="workout_set-${index}-DELETE" id="id_workout_set-${index}-DELETE" />
        <input type="hidden" name="workout_set-${index}-id" id="id_workout_set-${index}-id" />
        <input type="hidden" name="workout_set-${index}-routine" value="1" id="id_workout_set-${index}-routine" />
      </td>
    </tr>
    </table></div>
    `
    appendTo.append(wo_template);
    $(table_meta).val(parseInt(form_idx) + 1);
}
//Add form event
var wo_location = $('#wo_form_set');
var wo_id = '#id_workout_set';
var wo_template = `` 
$('#add_form').click(function(){add_form(wo_location,wo_id, wo_template)});
