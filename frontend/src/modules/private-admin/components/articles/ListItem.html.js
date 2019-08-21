export default (item) => {
	return `<tr class="d-flex" data-id="id-${item.id}">
		<td class="col-3 text-left">${item.id}</td>
		<td class="col-7 text-left">${item.title}</td>
		<td class="col-2 d-flex actions text-center">
			<button type="button" class="btn btn-primary my-1 ripple" data-action="edit" data-id="${item.id}">
				<i class="fas fa-edit act" size="1x" ></i>
			</button>
			<button type="button" class="btn btn-primary my-1 ripple" data-action="delete" data-id="${item.id}">
				<i class="fas fa-trash act" size="1x"></i>
			</button>
		</td>
	</tr>`;
}
