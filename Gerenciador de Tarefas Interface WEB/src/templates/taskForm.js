exports.render = () => {
    return `
        <form>
            <div class="list">
                <label class="item item-input item-stacked-label">
                    <span class="input-label">Nova Tarefa</span>
                    <input type="text" data-task>
                </label>
            </div>
            <div class="padding">
                <button class="button button-dark button-block">
                    <i class="ion-compose"></i> Adicionar
                </button>
            </div>
        </form>
    `;
};