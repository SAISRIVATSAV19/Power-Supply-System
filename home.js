$(document).ready(function () {
    // Retrieve the data from localStorage
    const systems = JSON.parse(localStorage.getItem('powerSupplyData')) || [];

    if (systems.length > 0) {
        const container = $('#generated-systems');
        systems.forEach((system, index) => {
            const powerSupply = `
            <div class="col-md-4 power-supply-card mb-3">
                <div class="card shadow">
                    <div class="card-body">
                        <h5 class="card-title">${system.subsystem || 'Subsystem Unknown'} (ID: ${system.powerSupplyId || 'Unknown ID'})</h5>
                        <div class="form-group">
                            <label>Current (A)</label>
                            <input type="text" class="form-control" id="current-${index}" value="N/A" readonly>
                        </div>
                        <div class="form-group">
                            <label>Voltage (V)</label>
                            <input type="text" class="form-control" id="voltage-${index}" value="N/A" readonly>
                        </div>
                        <div class="d-flex justify-content-center mt-3">
                            <button class="btn btn-success mx-2 btn-on">ON</button>
                            <button class="btn btn-danger mx-2 btn-off">OFF</button>
                            <button class="btn btn-primary mx-2 btn-settings" data-index="${index}">Settings</button>
                        </div>
                    </div>
                </div>
            </div>`;
            container.append(powerSupply);
        });

        // Add click listener for the "Settings" button
        $('.btn-settings').click(function () {
            const index = $(this).data('index');
            openSettingsModal(index, systems);
        });
    } else {
        $('#generated-systems').html('<p>No systems found. Please configure the power supplies first.</p>');
    }
});

// Function to open the settings modal
function openSettingsModal(index, systems) {
    const system = systems[index];

    // Show which system is being updated in the modal alert
    const alertMessage = `You are updating settings for Subsystem: ${system.subsystem || 'Unknown'} (ID: ${system.powerSupplyId || 'Unknown ID'})`;
    $('#settingsAlert').text(alertMessage).show();

    // Pre-fill the modal with current values
    $('#modalCurrent').val(system.current || '');
    $('#modalVoltage').val(system.voltage || '');

    // Show the modal
    $('#settingsModal').modal('show');

    // Handle Save Changes button click
    $('#saveSettingsBtn').off('click').on('click', function () {
        const newCurrent = $('#modalCurrent').val();
        const newVoltage = $('#modalVoltage').val();

        // Update the JSON object without changing the UI display
        systems[index].current = newCurrent;
        systems[index].voltage = newVoltage;

        // Print the updated JSON object to the console
        console.log("Updated JSON object (stored, not shown on UI):", systems);

        // Hide the modal after saving
        $('#settingsModal').modal('hide');
    });
}
