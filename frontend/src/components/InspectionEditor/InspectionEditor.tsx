import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { TDocInspectionType } from '../../state/AppDb';
import { IIndexedInspection } from '../../state/DocContextProvider/types';

function InspectionEditor(
    { value, onChange, onDelete }:
        {
            value: IIndexedInspection,
            onChange: (value: IIndexedInspection) => void,
            onDelete: (index: number) => void,
        }
) {
    const [inspection, setInspection] = useState<IIndexedInspection>(value);
    const [changed, setChanged] = useState<boolean>(false);

    useEffect(() => {
        if (!changed) return;
        setChanged(false);
        onChange(inspection);
    }, [changed, inspection, onChange])

    const handleOnChangeInspectionType = (event: ChangeEvent<HTMLSelectElement>) => {
        setInspection({
            ...inspection,
            value: {
                ...inspection.value,
                type: event.currentTarget.value as TDocInspectionType,
            }
        });
        setChanged(true);
    }

    const handleOnChangeInspectionInfo = (event: ChangeEvent<HTMLInputElement>) => {
        setInspection({
            ...inspection,
            value: {
                ...inspection.value,
                info: event.currentTarget.value,
            }
        });
        setChanged(true);
    }

    const handleOnClickDelInspection = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onDelete(inspection.id);
    }

    return (
        <fieldset>
            <label>
                <div>Tipo</div>
                <select value={inspection.value.type} onChange={handleOnChangeInspectionType}>
                    {['EQUIPAMENTO', 'NOTA'].map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            </label>
            <label>
                <div>Informação</div>
                <input type="text" value={inspection.value.info} onChange={handleOnChangeInspectionInfo} />
            </label>
            <button onClick={handleOnClickDelInspection}>Excluir</button>
        </fieldset>
    );
}

export default InspectionEditor;