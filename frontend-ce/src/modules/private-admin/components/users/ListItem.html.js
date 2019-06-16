export default (user) => {
	return `<tr class="d-flex" data-id="id-${user.id}">
		<td class="col-3 text-center">${user.name}</td>
		<td class="col-3 text-center">${user.surname}</td>
		<td class="col-4 text-center">${user.email}</td>
		<td class="col-2 d-flex actions text-center">
			<button type="button" class="btn btn-primary my-1 ripple" data-action="edit" data-id="${user.id}">
				<i class="fas fa-edit act" size="1x" ></i>
			</button>
			<button type="button" class="btn btn-primary my-1 ripple" data-action="delete" data-id="${user.id}">
				<i class="fas fa-trash act" size="1x"></i>
			</button>
		</td>
	</tr>`;
}
