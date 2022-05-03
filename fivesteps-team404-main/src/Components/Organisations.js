import React, {useEffect, useState} from 'react';
import { codes, addOrg, checkDupeCode, checkDupeOrg } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import $ from 'jquery';
import 'datatables.net-bs4';
import { MdDeleteForever } from "material-design-icons";
import DelModal from "./DelOrgModal";


export default function Organisations(){

	const [organisations, setOrganisations] = useState([]);
	const [newCode, setNewCode] = useState("");
    const [newOrganisation, setNewOrganisation] = useState("");
    const [show, setShow] = useState(false);   
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);	
	const [deleteModal, setDeleteModal] = useState(false);
	const [selectedOrg, setSelectedOrg] = useState()
	const [selectedOrgName, setSelectedOrgName] = useState()

  
	function fetchData() {
		let isMounted = true;		
		codes().then((result) => {
			if (isMounted) {	
				$('#orgtable').DataTable().destroy();
				setOrganisations(result);	
			}
		})
		if (organisations.length != 0) {
			isMounted = false;
		}
	}

	async function addNewOrg(newOrganisation, newCode){
		//controlleer of de klant al in de DB staat
        const isDupeOrg = await checkDupeOrg(newOrganisation);
        //console.log(isDupeOrg);           //debug om te kijken wat het resultaat is. True=bestaat al False=bestaat niet
        //controlleer of de klant al in de DB staat
        const isDupeCode = await checkDupeCode(newCode);
        //console.log(isDupeCode);          //debug om te kijken wat het resultaat is. True=bestaat al False=bestaat niet

		if(newOrganisation && newCode){
            if(!isDupeOrg){
                if(!isDupeCode){
                    //update data in scherm naar nieuwe data!
					addOrg(newOrganisation,newCode).then(codes().then((result) => {
						$('#orgtable').DataTable().destroy();
						setOrganisations(result);   
						setNewOrganisation("");
						setNewCode("");
					}))
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

	//fetch data
	fetchData();

	useEffect(() => {
		$('#orgtable').DataTable();
	}, [organisations]);

	$(document).ready(function (){
		$('#orgtable').DataTable();
	});	

	return(	
		<div className="row">
			<Button onClick={handleShow} className="button col-2" data-toggle="modal">
				<i className="material-icons">&#xE147;</i> 
				<span>Klant toevoegen</span>
			</Button>
			
			<table id="orgtable" className='table table-striped'>
				<thead>
					<tr>
						<th scope="col">Klanten</th>
						<th scope="col">Code</th>
					</tr>
				</thead>
				<tbody>
					{organisations.map((org, index) => (
						<tr key={index}>
							<th scope="row">								
                                <a onClick={() => {
										setDeleteModal(true)
										setSelectedOrg(org.id)
										setSelectedOrgName(org.organisation)
										}}><i class="fa-solid fa-trash"></i></a>

								<Link to={`/klanten/${org.id}`}>
									{org.organisation}
								</Link>
							</th>
							<td>{org.code}</td>
						</tr>
					))}				
				</tbody>				
			</table>

			{deleteModal && <DelModal closeModal={setDeleteModal} id={selectedOrg} orgName={selectedOrgName}/>}

			<Modal show = {show}>
                <Modal.Header>
                    <Modal.Title>
                        Klant toevoegen
                    </Modal.Title>
                </Modal.Header>
                <Form>
                <Modal.Body>
            
                        <Form.Group>
                        <div class="mb-3 mt-3">
                                <label class="form-label">Klant naam:</label>
                            <Form.Control
                                type="text"
                                placeholder="Klant *"
                                onChange={(event) => {
                                    setNewOrganisation(event.target.value);
                                    } 
                                }    
                                required
                            />
                            </div>
                        </Form.Group>
                        <Form.Group>
                        <div class="mb-3">
                                <label class="form-label">Klant code:</label>
                            <Form.Control
                                type="text"
                                placeholder="Code *"
                                onChange={(event) => {
                                    setNewCode(event.target.value);
                                    } 
                                } 
                                required
                            />
                            </div>
                        </Form.Group>               
                </Modal.Body>
                <Modal.Footer>
                    <Button className="button align-left" onClick= {() => 
                    {
                        addNewOrg(newOrganisation,newCode);
                    }}>Klant aanmaken</Button>
 
                    <Button variant="secondary" onClick={handleClose}>
                        Sluiten
                    </Button>
 
                </Modal.Footer>
                </Form>
            </Modal>

		</div>	
	);
}