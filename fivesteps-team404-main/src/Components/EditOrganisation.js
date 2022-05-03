import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrgByID, updateOrgById, codes, checkDupeOrg } from "../firebaseConfig";

export default function EditOrganisation() {

    let params = useParams();

    const [organisation, setOrganisation] = useState([]);

    function fetchData() {
        let isMounted = true;
        getOrgByID(params.organisationId).then((result) => {
            //console.log(getOrgByID(params.organisationId));
            if (isMounted) setOrganisation(result);
        })
        if (organisation.length != 0) isMounted = false;
    }

    function updateOrganisation() {
        //pak values
        let organisatie = document.getElementById('organisatie').value;
        let code = document.getElementById('code').value;

        if (code == '') {
            code = organisation.code;
        }

        checkDupeOrg(organisatie || code).then((result) => {
            if (result === true) {
                alert("Ingevoerde gegevens bestaan al");
            } else {
                updateOrgById(params.organisationId, organisatie, code);
            }
        });

        document.getElementById('organisatie').placeholder = organisatie;
        document.getElementById('code').placeholder = code;
        document.getElementById('organisatie').value = '';
        document.getElementById('code').value = '';
    }

    fetchData();

    return (
        <div>
            <form>
                <div class="row">
                    <label>Organisatie</label>
                    <input class="input" type="text" id="organisatie" placeholder={organisation.organisation}></input>
                </div>
                <div class="row">
                    <label>Code</label>
                    <input class="input" type="text" id="code" placeholder={organisation.code}></input>
                </div>
                <div class="row">
                    <a class="button col-2" onClick={updateOrganisation}>Wijzig</a>
                    <Link class="button col-2" to={`/orgs/${params.organisationId}`}>Terug</Link>
                </div>
            </form>
        </div>

    )
}