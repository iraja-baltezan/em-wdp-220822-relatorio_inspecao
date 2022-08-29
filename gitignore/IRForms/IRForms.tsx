import React, { useContext } from 'react';
import { IAppContext, AppContext } from '../../state/AppContext';



function IRForms() {
    const { id, date } = useContext(AppContext) as IAppContext;

    return (
        <div>
            <h1>
                Mostra Formulários
            </h1>
            <p>{id}</p>
            <p>{date}</p>

            <button>Listar documentos</button>
            <button>Novo documento</button>
            <button>Salvar documento</button>
        </div>

    );
}

export default IRForms;

/*
<fieldset>
<legend>Edição</legend>
<label>
    <div>
        Identificador desta edição
    </div>
    <input type="text" value={id} readOnly />
</label>
<label>
    <div>
        Data da edição
    </div>
    <input type="date" value={date} />
</label>
</fieldset>
<fieldset>
<legend>
    Empresa
</legend>
<label>
    <div>
        Logomarca, logotipo
    </div>
    <input type="text" value={company && company.logo ? company.logo : ''} />
</label>
<label>
    <div>
        Nome
    </div>
    <input type="text" value={company && company.name ? company.name : ''} />
</label>
<label>
    <div>
        Endereço
    </div>
    <input type="text" value={company && company.address ? company.address : ''} />
</label>
<label>
    <div>
        Contato
    </div>
    <input type="text" value={company && company.contact ? company.contact : ''} />
</label>
</fieldset>
*/