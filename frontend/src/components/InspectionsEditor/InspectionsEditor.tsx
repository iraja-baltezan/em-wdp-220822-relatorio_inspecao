import React, { MouseEvent, useEffect, useState } from 'react';
import { IDocInspectionDbRow } from '../../state/AppDb';
import { IIndexedInspection } from '../../state/DocContextProvider/types';
import InspectionEditor from '../InspectionEditor';

function InspectionsEditor(
    { value, onChange }:
        {
            value: IDocInspectionDbRow[],
            onChange: (value: IDocInspectionDbRow[]) => void,
        }
) {
    const [indexedInspections, setIndexedInspections] = useState<IIndexedInspection[]>([]);
    const [changed, setChanged] = useState<boolean>(false);

    useEffect(() => {
        const newIndexedInspections: IIndexedInspection[] = value.map(
            (inspection, idx) => ({ id: idx, value: inspection })
        );
        setIndexedInspections(newIndexedInspections);
    }, [value]);

    useEffect(() => {
        if (!changed) return;
        setChanged(false);
        const inspections: IDocInspectionDbRow[] = indexedInspections.map(inspection => inspection.value);
        onChange(inspections);
    }, [changed, indexedInspections, onChange])

    const handleOnClickAddInspection = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const lastInspection = indexedInspections
            .reduce(
                (prevIdxInsp, currIdxInsp) => (prevIdxInsp.id > currIdxInsp.id ? prevIdxInsp : currIdxInsp),
                {
                    id: -1,
                    value: { info:'', type:'NOTA'}
                }
            );
        setIndexedInspections([
            ...indexedInspections,
            {
                id: lastInspection.id + 1,
                value: {
                    type: 'EQUIPAMENTO',
                    info: '',
                }
            }
        ]);
        setChanged(true);
    }

    const handleOnChangeInspection = (value: IIndexedInspection) => {
        const newIndexedInspections = indexedInspections.map((inspection) => {
            if (value.id === inspection.id)
                return value;
            else
                return inspection;
        });
        setIndexedInspections(newIndexedInspections);
        setChanged(true);
    }

    const handleOnDeleteInspection = (index: number) => {
        const newIndexedInspections = indexedInspections.filter((inspection) => {
            return inspection.id !== index
        })
        setIndexedInspections(newIndexedInspections);
        setChanged(true);
    }

    return (
        <fieldset>
            <legend>
                Lista de inspeção
            </legend>
            {indexedInspections.map((inspection) => (
                <InspectionEditor
                    key={inspection.id}
                    value={inspection}
                    onChange={handleOnChangeInspection}
                    onDelete={handleOnDeleteInspection}
                />
            ))}
            <footer>
                <button onClick={handleOnClickAddInspection}>Incluir item</button>
            </footer>
        </fieldset>
    );
}

export default InspectionsEditor;