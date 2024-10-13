
router.put('/patients/:id', async (req, res) => {
    const { diagnosis, treatment } = req.body;

    try {
        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.id,
            { diagnosis, treatment },
            { new: true } 
        );
        
        if (!updatedPatient) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }

        res.json(updatedPatient);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el paciente', error });
    }
});
