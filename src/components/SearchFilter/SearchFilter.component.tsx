import React from 'react';
import { IonGrid, IonRow, IonCol, IonSearchbar } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';


export interface SearchFilterComponentProps {
    onChangeSearch: Function
}
 
const SearchFilterComponent: React.SFC<SearchFilterComponentProps> = ({onChangeSearch}) => {
    return ( 
        <IonGrid>
            <IonRow>
                <IonCol>
                    <IonSearchbar 
                    placeholder="What do you looking for?..." 
                    onIonChange={e => onChangeSearch(e.detail.value)} 
                    animated={true}
                    clearIcon={closeOutline} />
                </IonCol>
            </IonRow>
        </IonGrid>
     );
}
 
export default SearchFilterComponent;
