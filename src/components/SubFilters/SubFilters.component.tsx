import React, { useState } from 'react';
import { IonGrid, IonRow, IonCol, IonChip, IonLabel, IonItem, IonSelect, IonSelectOption, IonIcon } from '@ionic/react';
import { filterOutline } from 'ionicons/icons';
import './subFiltersComponent.css';
import ResultsViewComponent from '../Results/Result.component';

export interface SubFiltersComponentProps {
    subFilters: string[],
    selectValue: string
}
 
const SubFiltersComponent: React.SFC<SubFiltersComponentProps> = ({subFilters, selectValue}) => {
    const [subFiltersSelected, setSubFiltersSelected] = useState<string[]>([]);
    const [filterResults, setFilterResults] = useState<string[]>([selectValue]);

    const getFiltersForResults = (subFiltersValue: string[]) => {
        setSubFiltersSelected(subFiltersValue);
        subFiltersValue.map((items: string) => {
           return setFilterResults([...filterResults, items])
        });
        return filterResults;
    }

    return ( 
        <IonGrid>
            <IonRow>
                <IonCol size="12">
                    <IonItem lines="none">
                        <IonIcon size="small" icon={filterOutline} />
                        <IonSelect className="subfilters__select" multiple={true} placeholder={`Select something about ${selectValue}`} onIonChange={e => getFiltersForResults(e.detail.value)}>
                            {subFilters.length > 0 && subFilters.map((item: string, index: number) => {
                                return <IonSelectOption key={index} value={item}>{item}</IonSelectOption>
                            })}
                        </IonSelect>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    { subFiltersSelected.length > 0 && subFiltersSelected.map((sub: string, index: number) => {
                        return <IonChip key={index} outline={true} color="tertiary">
                            <IonLabel color="tertiary">{sub}</IonLabel>
                        </IonChip>
                    })}
                </IonCol>
            </IonRow>
            {filterResults.length > 0 && <ResultsViewComponent tagsFilter={filterResults} />}
        </IonGrid>
     );
}
 
export default SubFiltersComponent;
