[1mdiff --git a/src/components/Admin/AdminDashboard.js b/src/components/Admin/AdminDashboard.js[m
[1mindex 52a853a..e66c7ef 100644[m
[1m--- a/src/components/Admin/AdminDashboard.js[m
[1m+++ b/src/components/Admin/AdminDashboard.js[m
[36m@@ -442,9 +442,43 @@[m [mconst handleDeleteTender = (tender) => {[m
     });[m
 };[m
 [m
[31m-const handleViewTender = (tender) => {[m
[31m-  // Implement your logic to view tender details[m
[31m-  alert(`Viewing tender: ${tender.title}`);[m
[32m+[m[32mconst [tenderToUpdate, setTenderToUpdate] = useState(null);[m
[32m+[m
[32m+[m[32m// Function to handle update click[m
[32m+[m[32mconst handleUpdateTenderClick = (tender) => {[m
[32m+[m[32m  setTenderToUpdate(tender);[m
[32m+[m[32m};[m
[32m+[m[32mconst handleTenderUpdateChange = (e) => {[m
[32m+[m[32m  setTenderToUpdate({ ...tenderToUpdate, [e.target.name]: e.target.value });[m
[32m+[m[32m};[m
[32m+[m
[32m+[m[32mconst handleTenderUpdateSubmit = (e) => {[m
[32m+[m[32m  e.preventDefault();[m
[32m+[m[32m  const token = localStorage.getItem('token');[m
[32m+[m[41m  [m
[32m+[m[32m  fetch(`https://mysite-jr5y.onrender.com/tenders/${tenderToUpdate.id}`, {[m
[32m+[m[32m    method: 'PATCH',[m
[32m+[m[32m    headers: {[m
[32m+[m[32m      'Authorization': `Bearer ${token}`,[m
[32m+[m[32m      'Content-Type': 'application/json',[m
[32m+[m[32m    },[m
[32m+[m[32m    body: JSON.stringify({ tender: tenderToUpdate }),[m
[32m+[m[32m  })[m
[32m+[m[32m    .then(response => response.json())[m
[32m+[m[32m    .then(data => {[m
[32m+[m[32m      setTenderToUpdate(null); // Close the form[m
[32m+[m[32m      setResponseMessage('Tender updated successfully');[m
[32m+[m[32m      // Fetch updated tenders list[m
[32m+[m[32m      fetch('https://mysite-jr5y.onrender.com/tenders', {[m
[32m+[m[32m        headers: { 'Authorization': `Bearer ${token}` }[m
[32m+[m[32m      })[m
[32m+[m[32m        .then(response => response.json())[m
[32m+[m[32m        .then(tendersData => setSelectedData({ type: 'tenders', data: tendersData }));[m
[32m+[m[32m    })[m
[32m+[m[32m    .catch(error => {[m
[32m+[m[32m      console.error('Error:', error);[m
[32m+[m[32m      alert('Failed to update tender');[m
[32m+[m[32m    });[m
 };[m
 [m
   const handleUserUpdateChange = (e) => {[m
[36m@@ -620,19 +654,19 @@[m [mconst handleViewTender = (tender) => {[m
               </tr>[m
             </thead>[m
             <tbody>[m
[31m-              {selectedData.data.map(tender => ([m
[31m-                <tr key={tender.id}>[m
[31m-                  <td>{tender.id}</td>[m
[31m-                  <td>{tender.tender_number}</td>[m
[31m-                  <td>{tender.tender_description}</td>[m
[31m-                  <td>Ksh {tender.tender_fee}</td>[m
[31m-                  <td>[m
[31m-                    {/* Add buttons for actions */}[m
[31m-                    <button className='btn btn-primary'>View</button>[m
[31m-                    <button onClick={()=>handleDeleteTender(tender)} className='btn btn-danger'>Delete</button>[m
[31m-                  </td>[m
[31m-                </tr>[m
[31m-              ))}[m
[32m+[m[32m            {selectedData.data.map(tender => ([m
[32m+[m[32m              <tr key={tender.id}>[m
[32m+[m[32m                <td>{tender.id}</td>[m
[32m+[m[32m                <td>{tender.tender_number}</td>[m
[32m+[m[32m                <td>{tender.tender_description}</td>[m
[32m+[m[32m                <td>Ksh {tender.tender_fee}</td>[m
[32m+[m[32m                <td>[m
[32m+[m[32m                  {/* Replace "View" button with "Update" */}[m
[32m+[m[32m                  <button className='btn btn-success' onClick={() => handleUpdateTenderClick(tender)}>Update</button>[m
[32m+[m[32m                  <button onClick={() => handleDeleteTender(tender)} className='btn btn-danger'>Delete</button>[m
[32m+[m[32m                </td>[m
[32m+[m[32m              </tr>[m
[32m+[m[32m            ))}[m
             </tbody>[m
           </table>[m
         </>[m
[36m@@ -1062,6 +1096,63 @@[m [mconst handleViewTender = (tender) => {[m
               </form>[m
             </div>[m
           )}[m
[32m+[m[32m          {tenderToUpdate && ([m
[32m+[m[32m            <div className="update-tender-form">[m
[32m+[m[32m              <h4>Update Tender</h4>[m
[32m+[m[32m              <form onSubmit={handleTenderUpdateSubmit}>[m
[32m+[m[32m                <div className="form-group">[m
[32m+[m[32m                  <label>Tender Number:</label>[m
[32m+[m[32m                  <input[m
[32m+[m[32m                    type="text"[m
[32m+[m[32m                    name="tender_number"[m
[32m+[m[32m                    value={tenderToUpdate.tender_number}[m
[32m+[m[32m                    onChange={handleTenderUpdateChange}[m
[32m+[m[32m                    placeholder={tenderToUpdate.tender_number}[m
[32m+[m[32m                    className="form-input"[m
[32m+[m[32m                    required[m
[32m+[m[32m                  />[m
[32m+[m[32m                </div>[m
[32m+[m[32m                <div className="form-group">[m
[32m+[m[32m                  <label>Tender Fee:</label>[m
[32m+[m[32m                  <input[m
[32m+[m[32m                    type="number"[m
[32m+[m[32m                    name="tender_fee"[m
[32m+[m[32m                    value={tenderToUpdate.tender_fee}[m
[32m+[m[32m                    onChange={handleTenderUpdateChange}[m
[32m+[m[32m                    placeholder={tenderToUpdate.tender_fee}[m
[32m+[m[32m                    className="form-input"[m
[32m+[m[32m                    required[m
[32m+[m[32m                  />[m
[32m+[m[32m                </div>[m
[32m+[m[32m                <div className="form-group">[m
[32m+[m[32m                  <label>Application Deadline:</label>[m
[32m+[m[32m                  <input[m
[32m+[m[32m                    type="date"[m
[32m+[m[32m                    name="application_deadline"[m
[32m+[m[32m                    value={tenderToUpdate.application_deadline}[m
[32m+[m[32m                    onChange={handleTenderUpdateChange}[m
[32m+[m[32m                    placeholder={tenderToUpdate.application_deadline}[m
[32m+[m[32m                    className="form-input"[m
[32m+[m[32m                    required[m
[32m+[m[32m                  />[m
[32m+[m[32m                </div>[m
[32m+[m[32m                <div className="form-group">[m
[32m+[m[32m                  <label>Description:</label>[m
[32m+[m[32m                  <textarea[m
[32m+[m[32m                    name="tender_description"[m
[32m+[m[32m                    value={tenderToUpdate.tender_description}[m
[32m+[m[32m                    onChange={handleTenderUpdateChange}[m
[32m+[m[32m                    placeholder={tenderToUpdate.tender_description}[m
[32m+[m[32m                    className="form-input"[m
[32m+[m[32m                    required[m
[32m+[m[32m                  />[m
[32m+[m[32m                </div>[m
[32m+[m[32m                <button type="submit" className="btn btn-primary">Update</button>[m
[32m+[m[32m                <button type="button" className="btn btn-secondary" onClick={() => setTenderToUpdate(null)}>Close</button>[m
[32m+[m[32m              </form>[m
[32m+[m[32m            </div>[m
[32m+[m[32m          )}[m
[32m+[m
         <ConfirmDeleteModal[m
           isOpen={isModalOpen}[m
           toggle={() => setIsModalOpen(false)}[m
