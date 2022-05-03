import "./DelOrgModal.css";
import {delOrg} from "../firebaseConfig";
import React from "react";

export default function DelModal({closeModal, id, orgName}){

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1>Weet je zeker dat je "{orgName}" wilt verwijderen?</h1>
                </div>
                <div className="footer">
                    <button id="cancelBtn" onClick={() => {closeModal(false)}}>Cancel</button>
                    <button id="confirmBTN" onClick={() => {delOrg(id)}}>Verwijder</button>
                </div>
            </div>
        </div>
    )
}
