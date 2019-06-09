export default (user) => {
	return `<tr class="d-flex" data-id="id-${user.id}">
		<td class="col-3">${user.name}</td>
		<td class="col-3">${user.surname}</td>
		<td class="col-3">${user.email}</td>
		<td class="col-3 d-flex actions">
			<button class="btn btn-raised btn-info bmd-btn-fab bmd-btn-fab-sm" data-action="edit" data-id="${user.id}">
				<i class="fas fa-edit act" size="1x"></i>
			</button>
			<button class="btn btn-info bmd-btn-fab bmd-btn-fab-sm" data-action="delete" data-id="${user.id}">
				<i class="fas fa-trash act" size="1x"></i>
			</button>
		</td>
	</tr>`;
}
