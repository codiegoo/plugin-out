/**
 * @swagger
 * /api/comando:
 *   post:
 *     summary: Registra el último comando enviado a un dispositivo
 *     tags: [Comando]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "sensor01"
 *               comando:
 *                 type: string
 *                 example: "ON"
 *     responses:
 *       200:
 *         description: Comando guardado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *       400:
 *         description: Faltan datos requeridos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Faltan datos
 */

/**
 * @swagger
 * /api/comando:
 *   get:
 *     summary: Obtiene el último comando para un dispositivo específico
 *     tags: [Comando]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del dispositivo
 *     responses:
 *       200:
 *         description: Último comando en texto plano
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: ON
 *       400:
 *         description: Falta el nombre del dispositivo
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Falta el nombre
 */

/**
 * @swagger
 * /api/reportar:
 *   post:
 *     summary: Reporta datos desde ESP32
 *     tags: [Reportar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             title: Datos de reporte
 *             properties:
 *               name:
 *                 type: string
 *                 example: sensor001
 *               temperature:
 *                 type: number
 *                 example: 23.5
 *               humidity:
 *                 type: number
 *                 example: 60.2
 *     responses:
 *       200:
 *         description: Datos guardados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 device:
 *                   type: object
 */

/**
 * @swagger
 * /api/reportar:
 *   get:
 *     summary: Obtiene el último estado del dispositivo
 *     tags: [Reportar]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del dispositivo
 *     responses:
 *       200:
 *         description: Último estado reportado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               title: Último dato reportado
 *               properties:
 *                 temperature:
 *                   type: number
 *                   example: 22.7
 *                 humidity:
 *                   type: number
 *                   example: 59.4
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Dispositivo no encontrado
 */

/**
 * @swagger
 * /api/getnombre:
 *   get:
 *     summary: Obtiene el nombre del primer dispositivo registrado
 *     tags: [Nombre]
 *     responses:
 *       200:
 *         description: Nombre del dispositivo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: dispositivo_001
 *       404:
 *         description: No hay dispositivos registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No hay dispositivos registrados
 *       500:
 *         description: Error al consultar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al consultar
 */

/**
 * @swagger
 * /api/comando-customizado:
 *   post:
 *     summary: Crea un nuevo comando personalizado
 *     tags: [Comando-customizado]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "654321"
 *               name:
 *                 type: string
 *                 example: "Encender luz"
 *               action:
 *                 type: string
 *                 example: "ON"
 *     responses:
 *       200:
 *         description: Comando creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 command:
 *                   type: object
 *       500:
 *         description: Error al guardar el comando
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al guardar el comando
 */

/**
 * @swagger
 * /api/custom-commands:
 *   get:
 *     summary: Obtiene los comandos personalizados de un usuario
 *     tags: [Comando-customizado]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de comandos personalizados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 commands:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Falta user_id en la query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Falta user_id en la query
 *       500:
 *         description: Error al obtener los comandos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener los comandos
 */