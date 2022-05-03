import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrgByID, updateOrgById, checkDupeOrg, checkDupeCode } from "../firebaseConfig";
import { Modal, Button, Form, Alert } from 'react-bootstrap';

export default function Organisation() {

    let params = useParams();

    const [organisation, setOrganisation] = useState([]);
    const [newCode, setNewCode] = useState("");
    const [newOrganisation, setNewOrganisation] = useState("");
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    function fetchData(){
        let isMounted = true;
        getOrgByID(params.organisationId).then((result) => {
            //console.log(getOrgByID(params.organisationId));		
            if (isMounted) setOrganisation(result);
        })
        if (organisation.length != 0) isMounted = false;
    }    

    async function editFunc(nCode, nOrganisation){
        //controlleer of de klant al in de DB staat
        const isDupeOrg = await checkDupeOrg(nOrganisation);
        //console.log(isDupeOrg);           //debug om te kijken wat het resultaat is. True=bestaat al False=bestaat niet
        //controlleer of de klant al in de DB staat
        const isDupeCode = await checkDupeCode(nCode);
        //console.log(isDupeCode);          //debug om te kijken wat het resultaat is. True=bestaat al False=bestaat niet

        //kijk of de klant hetzelde is als de huidige
        if(nOrganisation && nCode){
            if(!isDupeOrg || nOrganisation == organisation.organisation){
                if(!isDupeCode || nCode == organisation.code){
                    console.log("UPDATE");
                    //update data in scherm naar nieuwe data!
                    updateOrgById(params.organisationId, nOrganisation, nCode);
                    getOrgByID(params.organisationId).then((result) => {		
                        setOrganisation(result);
                    });
                    handleClose();  //modal weg
                }
                else{
                    alert("Code bestaat in DB!"); //verander naar popup of alert
                }
            }
            else{
                alert("Naam bestaat in DB!");//verander naar popup of alert
            }
        } 
        else{
            alert("Lege input");
        }  
    }

    fetchData();  

    return (
        <div className="row">
            <div className="row">
                <p className=""><b>Klant naam</b> {organisation.organisation}</p>
                <p className=""><b>Klant code</b> {organisation.code}</p>
            </div>
            <div className="row">
                <Button onClick={handleShow} className="button col-2" data-toggle="modal">Wijzigen</Button>
                <Link className="button-red col-2" to={`/klanten/verwijderen/${params.organisationId}`}>Verwijderen</Link>                
            </div>

            <Modal show={show}>
                <Modal.Header>
					<Modal.Title>
						Klant wijzigen
					</Modal.Title>
				</Modal.Header>
                <Form>
                    <Modal.Body>
						<Form.Group>
							<Form.Control
								type="text"
								placeholder={organisation.organisation}
								onChange={(event) => {
									setNewOrganisation(event.target.value);
									} 
								}    
								required
							/>
						</Form.Group>
						<Form.Group>
							<Form.Control
								type="text"
								placeholder={organisation.code}
								onChange={(event) => {
									setNewCode(event.target.value);
									} 
								} 
								required
							/>
						</Form.Group>				
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="button align-left" onClick={ () => {editFunc(newCode, newOrganisation)} }>Opslaan</Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Sluiten
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}