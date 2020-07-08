import React, { useState } from 'react';
import SearchFilterComponent from '../SearchFilter/SearchFilter.component';
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonTitle, IonLoading } from '@ionic/react';
import RecommendedFiltersComponent from '../RecommendedFilter/RecommendedFilter.component';
import { searchOutline } from 'ionicons/icons';
import ResultsViewComponent from '../Results/Result.component';
import axios from 'axios';

export interface PrincipalFilterComponentProps {
    
}
 
const PrincipalFilterComponent: React.SFC<PrincipalFilterComponentProps> = () => {
    const [searchActive, setSearchActive] = useState<Boolean>(false);
    const [results, setResults] = useState([]);
    const [showLoading, setShowLoading] = useState(false);

    const onChangeSearch = (searchValue: string | undefined | null) => {
        axios({
            "method":"GET",
            "url":"https://tasty.p.rapidapi.com/recipes/auto-complete?",
            "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"tasty.p.rapidapi.com",
                "x-rapidapi-key":"78d63c1373msh8833585cf039d7cp1a877djsn5d2601f5d3b7",
                "useQueryString":true
            },
            "params":{
                "prefix": searchValue
            }
        }).then((response)=> {
            setShowLoading(true);
            setResults(response.data);
        }).catch((error)=> {console.log(error)
        }).finally(() => {setShowLoading(false)})
    };

    const getSearchView =() => {
        setSearchActive(searchActive === false ? true : false);
    };

    return ( 
        <IonPage>
            <IonLoading
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={5000}
            />
            <IonHeader className="ion-no-border ion-padding-top">
                <IonToolbar>
                <IonButtons slot="end">
                <IonMenuButton autoHide={false}>
                    <IonButton onClick={getSearchView}>
                        <IonIcon icon={searchOutline}></IonIcon>
                    </IonButton>
                </IonMenuButton>
                </IonButtons>
                <IonTitle size="large">Explore</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {searchActive && <SearchFilterComponent onChangeSearch={onChangeSearch} />}
                <RecommendedFiltersComponent />
                {results.length > 0 && <ResultsViewComponent resultsSearch={results} />}
            </IonContent>
        </IonPage>
     );
}
 
export default PrincipalFilterComponent;
