-- Lote 6: amplía la cita (texto literal que sigue en el bloque del corpus) de 160 preguntas.
-- Guardas: solo si la cita actual acaba exactamente como la que se amplió, y no está editada a mano.
with u as (
  update public.banco_preguntas b set cita = b.cita || v.ext, editada_at = now()
  from (values
('C048-0450','ESIÓN, ALTERNATIVOS (5/800 kW;',' caudales > 1.500 m³/h; 1.450/2.900 rpm; simple o doble efecto) y ROTATIVOS (de paletas y excéntrica, potencias no muy elevadas; de espiral o SCROLL, 5/40 kW, bajo nivel sonoro, 1.450 rpm; de TORNILLO, 100/1.000 kW, máx. 4.000 kW, lubricación muy importante, 1.450 a 10.000 rpm; CENTRÍFUGOS, > 1.500 kW, 10.000/30.000 rpm, larga duración en continuo); por su MONTAJE, HERMÉTICOS (no desmontables, motor y compresor en…'),
('C048-0473','de causar enfermedad o muerte:',' NO usarlas con OXÍGENO por debajo del 18 % ni en contenedores sin ventilación, «focos», canales, etc.
MANTENIMIENTO (2.5.4): en su embalaje original, en lugar fresco y seco, sin sol; si están dañadas o caducadas, se eliminan.'),
('C048-0478','valorar por dónde entrar;',' memorizar PUNTOS DE REFERENCIA, con cuidado de los DUPLICADOS (hoteles, residencias, hospitales); mirar OTRA PLANTA NO INCENDIADA con la misma distribución; rapidez anteponiendo la seguridad; con cuerda guía, NUNCA perder el contacto; los tendidos de manguera, SOLO COMO GUÍA SECUNDARIA.'),
('C049-0006','onas suelen HUIR HACIA ARRIBA;',' ajustarse a las órdenes y comunicar cualquier iniciativa; en planta con fuego, búsqueda RADIAL empezando alrededor del fuego y hacia fuera, aprovechando su luz; víctima localizada y comunicada → a zona segura SIN DEMORA.'),
('C049-0020','len; reunirse en los rellanos;',' para SUBIR, igual, agachados o a gatas.'),
('C049-0029','ro del cuerpo hacia los lados;',' informa del terreno y de obstáculos hasta la CINTURA (para obstáculos altos, protección alta); el arco se genera con la MUÑECA, no con el brazo; con el pie DERECHO adelante el bastón rastrea el lado IZQUIERDO, alternado con las piernas.'),
('C049-0039',' selectivo para evitar fatiga;',' pared a la derecha → brazo IZQUIERDO y viceversa.'),
('C049-0040','e del PECHO a la zona PÉLVICA;',' variante con el brazo en DIAGONAL (mano delante de la pierna contraria).'),
('C049-0053','on transferibles (olor a gas);',' no todos valen igual (relevantes, menores, negativos).'),
('C049-0070','dos los datos antes de entrar;',' en grandes superficies, DISPOSITIVOS SONOROS PORTÁTILES como referencias.'),
('C049-0083','principio, BAGA CON MOSQUETÓN;',' elementos ABIERTOS (radiador, manivela): BALLESTRINQUE; elementos CERRADOS: BALLESTRINQUE CON TRALLA si son de poco diámetro y BOULINE si son de gran diámetro (con la cuerda DOBLE); bifurcaciones: NUDO ORDINARIO.'),
('C049-0093','SA; en pasillos, a un LATERAL;',' al volver, dejar la bolsa atada a la guía y salir siguiéndola; plegarla con los indicadores bien colocados y comprobar que sale bien y que se ve PRIMERO EL NUDO CORTO; evitar brasas.'),
('C049-0098',' de la entrada; nudos seguros;',' atada a la ALTURA DE LA CINTURA y siempre TENSA; en pasillos, a un LATERAL; al volver, dejar la bolsa atada a la guía y salir siguiéndola; plegarla con los indicadores bien colocados y comprobar que sale bien y que se ve PRIMERO EL NUDO CORTO; evitar brasas.'),
('C049-0125','según los factores anteriores:','
Tumbado 6 / 0,2 · Sentado 7 / 0,3 · De pie 9 / 0,4 · Andar despacio 13 / 0,6 · Andar 3,2 km/h 16 / 0,7 · Andar «0,90 km/h» 18 / 0,8 · Andar en superficie blanda 23 / 1,1 · Andar 6,5 km/h 27 / 1,2 · Nadar 1,6 km/h 30 / 1,4 · Andar deprisa en superficie dura 34 / 1,5 · Nadar 1,85 km/h 40 / 1,8 · Andar en superficie blanda 40 / 1,8 · Bicicleta 45 / 1,8 · Correr 50 / 2 · Nadar 2,2 km/h 60 / 2,5 · Correr 15 km/h 65 /…'),
('C049-0177','elevan con tiempo para volver;',' disponer de RELEVOS AL MENOS 5 MINUTOS ANTES de que tengan que entrar; disponer, si se puede, de un equipo S.O.S. y ENVIARLO ante sospecha o confirmación de emergencia, informando al mando; anotar la salida; en RADIACIONES, comprobar el DOSÍMETRO y anotar la lectura en el REVERSO DE LA PLACA.'),
('C049-0182','ar y anotar la hora de salida;',' contactar con los equipos AL MENOS 5 MINUTOS ANTES de su hora de salida (confirmar situación y presión, recalcular); asegurar que se relevan con tiempo para volver; disponer de RELEVOS AL MENOS 5 MINUTOS ANTES de que tengan que entrar; disponer, si se puede, de un equipo S.O.S. y ENVIARLO ante sospecha o confirmación de emergencia, informando al mando; anotar la salida; en RADIACIONES, comprobar el DOSÍMETRO y…'),
('C049-0204','n; el perdido no se recupera);',' b) COMUNICAR LA SITUACIÓN pausada y claramente (lugar, estado, reserva de aire, datos para orientar) y comprobar que la recibe la persona adecuada (mando intermedio, control de ERA) pidiendo que REPITA EL MENSAJE; c) PROCURAR ORIENTARSE sin moverse a ciegas (ampliaría la zona de búsqueda); d) ECONOMIZAR AIRE (inspiraciones lentas, profundas y pausadas; sin trabajos de gran consumo).'),
('C049-0208',' («un cantante, una canción»);',' c) progresar rápido sin sacrificar la seguridad, aprovechando cuerda guía o manguera; d) LECTURA CONSTANTE DEL MANÓMETRO: la tensión dispara el consumo por encima de los VALORES NORMALES DE 40 L/MIN (D-108), y descuidarlo puede convertir un equipo en apuros en dos; e) al encontrar al equipo, evaluar reserva de aire, equipación, estado físico y localización, informarles y comunicar al exterior; f) rescatadores y…'),
('C049-0215','uipo que debería estar fuera);',' 4) SONIDO DE UNA ALARMA PERSONAL: activar el plan SIN ESPERAR CONFIRMACIÓN; 5) gestionar las necesidades del rescate.'),
('C049-0217',' «JEFE DEL EQUIPO DE RESCATE»;',' informar al equipo S.O.S. y pedir que repita las funciones; informar al CENTRO DE COORDINACIÓN; hacer acopio de material (camillas, ERA, máscaras, inmovilización); seguir y adaptar el plan.'),
('C049-0220','ia fuera, aprovechando su luz;',' víctima localizada y comunicada → a zona segura SIN DEMORA.'),
('C049-0221','el peso en la pierna ATRASADA;',' un BRAZO por delante a la altura de la CABEZA en vaivén, con la PALMA HACIA EL INTERIOR (el dorso por delante: si toca un cable eléctrico, la mano no se agarra a él); igual al chequear puertas.'),
('C049-0222','a que fuera se haga un «MAPA»;',' mirar el manómetro unas 5 VECES CADA 100 BAR y dejar reserva para la retirada (D-106); reducir de vez en cuando el ruido y escuchar; comunicar al compañero y al exterior cambios de nivel, dirección, zonas rastreadas, almacenamientos; empezar por las zonas de MÁS RIESGO o con más probabilidad de víctimas: las personas suelen HUIR HACIA ARRIBA; ajustarse a las órdenes y comunicar cualquier iniciativa; en planta con…'),
('C049-0226','e del PECHO a la zona PÉLVICA;',' variante con el brazo en DIAGONAL (mano delante de la pierna contraria).'),
('C049-0227','on la MUÑECA, no con el brazo;',' con el pie DERECHO adelante el bastón rastrea el lado IZQUIERDO, alternado con las piernas.'),
('C049-0229','to suave; brazo bien estirado;',' en mesas, por los CANTOS; error común: separarse de la superficie; muy adecuado en espacios CONOCIDOS.'),
('C049-0239','s o estáticos (escape de gas);',' valen más cuanto más familiares; algunos son transferibles (olor a gas); no todos valen igual (relevantes, menores, negativos).'),
('C049-0244','SA; en pasillos, a un LATERAL;',' al volver, dejar la bolsa atada a la guía y salir siguiéndola; plegarla con los indicadores bien colocados y comprobar que sale bien y que se ve PRIMERO EL NUDO CORTO; evitar brasas.'),
('C049-0247',' a la protección respiratoria;',' la bolsa va en la botella del «BOMBERO 1» con el orificio hacia abajo y el «BOMBERO 2» la saca y la va colocando; una cuerda por dirección, identificadas «A» y «B».'),
('C049-0256','JETIVO y VOLVER al aire libre;',' Tt = T − Tr.'),
('C049-0258','S. 4.2.2 AUTONOMÍA DE RESERVA:',' Vdr = v × pr (presión de accionamiento de la alarma) = 6 × 50 = 300 LITROS.'),
('C049-0268','o con los datos del siniestro;',' 3) a la izquierda, tabla PRESIÓN/TIEMPO DE TRABAJO; 4) CINCO CASILLAS por equipo (nº, presión de entrada, hora de entrada, hora prevista de salida, situación y función).'),
('C049-0270',' pequeñas se hace mentalmente;',' en las grandes, con sistemas de apoyo.'),
('C049-0272',' DECIDE cuándo sale un equipo:',' si no recibe comunicación, contacta y le informa del tiempo disponible según su presión.'),
('C049-0275',' NUNCA CON EL AIRE DE RESERVA:',' salir con la ALARMA SONANDO es un ERROR DE SEGURIDAD PERSONAL, salvo circunstancia excepcional como el rescate de una víctima.'),
('C049-0282',' DE ÉL QUE EMERGE al exterior;',' 3) INFORMACIÓN DEL CONTROL DE ERA (un equipo que debería estar fuera); 4) SONIDO DE UNA ALARMA PERSONAL: activar el plan SIN ESPERAR CONFIRMACIÓN; 5) gestionar las necesidades del rescate.'),
('C049-0284','NTES de que tengan que entrar;',' disponer, si se puede, de un equipo S.O.S. y ENVIARLO ante sospecha o confirmación de emergencia, informando al mando; anotar la salida; en RADIACIONES, comprobar el DOSÍMETRO y anotar la lectura en el REVERSO DE LA PLACA.'),
('C049-0286','BOMBEROS POR CADA ACCIDENTADO;',' designar CLARAMENTE al «JEFE DEL EQUIPO DE RESCATE»; informar al equipo S.O.S. y pedir que repita las funciones; informar al CENTRO DE COORDINACIÓN; hacer acopio de material (camillas, ERA, máscaras, inmovilización); seguir y adaptar el plan.'),
('C049-0287','ANGUERA, no separarse de ella;',' NUNCA ABANDONAR EL EQUIPO AUTÓNOMO.'),
('C050-0005','Con carácter general serán:','
- 1 UNIDAD DE MANDO Y COMUNICACIONES (U.M.C.): 1 Subjefe de Intervención y 1 Oficial de Conductores.
- 1 BOMBA URBANA LIGERA (B.U.L.): 1 Oficial, 3 Bomberos y 1 Bombero-Conductor.
- 1 AUTOESCALA AUTOMÁTICA (A.E.A.): 1 Oficial, 3 Bomberos y 1 Bombero-Conductor.
- 1 AMBULANCIA TIPO C (A.M.B.): 1 Médico, 1 Enfermero y 2 T.E.S.'),
('C050-0021','tipo de tendido y su diámetro,','
- las variables del siniestro (necesidad de abrepuertas, barreta, llaves de racorar, etc.).'),
('C050-0022','l MATERIAL puede variar según:','
- las funciones del Equipo,
- el tipo de tendido y su diámetro,
- las variables del siniestro (necesidad de abrepuertas, barreta, llaves de racorar, etc.).'),
('C050-0025','os equipos 1, 2, 3 y 4 llevan:','
- EQUIPO DE PROTECCIÓN INDIVIDUAL NIVEL 1 + ESCAPETTOR + CABO DE ANCLAJE INTEGRADO.
- EQUIPO DE RESPIRACIÓN AUTÓNOMO con T EN EL LATIGUILLO DEL PULMO, LOCALIZADOR PERSONAL y SECUROLL DE 6 METROS.
- Radioteléfono.
- Linterna.
- Máscara de salvamento con latiguillo.'),
('C050-0033','CIAL, además de la base común:','
- Teléfono móvil.
- CÁMARA TÉRMICA.
- CORTINA DE HUMO.'),
('C050-0049',' EL QUE QUEDAN EN ZONA SEGURA:','
- MOCHILA DE CIRCULATORIO.
- PULSICOOXÍMETRO PORTÁTIL.
- BALA DE OXÍGENO PORTÁTIL CON MASCARILLAS RESERVORIO.'),
('C050-0056','ación cerrada de SIETE puntos:','
1. Condiciones de la caja de escalera (limpia, humo, personas).
2. Posibilidad o no de tendido vertical.
3. Puerta de la vivienda (abierta o cerrada).
4. El acceso a la vivienda.
5. Incendio confinado o localizado.
6. Víctimas en el interior de la vivienda.
7. Incendio controlado o extinguido.'),
('C050-0078','L EQUIPO 4, en cesta de A.E.A.',', para salvamento o acceso por fachada para la extinción.'),
('C050-0082',' LA INTERVENCIÓN, tres puntos:','
1. Escalera lista para ventilación.
2. Escalera presurizada.
3. POSIBLES VÍCTIMAS POR ENCIMA DE LA COTA DEL INCENDIO.'),
('C050-0088','elo o desde la cesta de A.E.A.','
- Dado el caso (E-7 o E-5), efectúa la COLOCACIÓN DE LA CESTA.'),
('C050-0093','L., hasta la base de la A.E.A.','
· Tercio de 30 metros y 45 mm Ø a la tubería de la A.E.A., CON LA EXCEPCIÓN DE LA E-9, QUE IRÁ ATADO AL ÚLTIMO PELDAÑO.'),
('C050-0105','ACCESO Y MANIOBRA DE LA A.E.A.','
- En la colocación preverá LA POSIBLE CAÍDA DE ELEMENTOS DEL EDIFICIO por causa del incendio.'),
('C050-0131','dios de Zaragoza establece que',', EN EDIFICIOS CON ESCALERA PROTEGIDA O ESPECIALMENTE PROTEGIDA, las bocas de salida de columna seca SE SITUARÁN FUERA DEL RECINTO DE ESCALERA Y DEL VESTÍBULO DE INDEPENDENCIA, Y EN TODAS SUS PLANTAS.'),
('C050-0196','lece con carácter general que:','
- EQUIPO 1: el Oficial y un Bombero.
- EQUIPO 2: dos Bomberos.'),
('C050-0201','os equipos 1, 2, 3 y 4 llevan:','
- EQUIPO DE PROTECCIÓN INDIVIDUAL NIVEL 1 + ESCAPETTOR + CABO DE ANCLAJE INTEGRADO.
- EQUIPO DE RESPIRACIÓN AUTÓNOMO con T EN EL LATIGUILLO DEL PULMO, LOCALIZADOR PERSONAL y SECUROLL DE 6 METROS.
- Radioteléfono.
- Linterna.
- Máscara de salvamento con latiguillo.'),
('C050-0211',' LA INTERVENCIÓN, tres puntos:','
1. Escalera lista para ventilación.
2. Escalera presurizada.
3. POSIBLES VÍCTIMAS POR ENCIMA DE LA COTA DEL INCENDIO.'),
('C050-0214','a trifurcación, compuesto por:','
· Tercio de 45 mm Ø, QUE SE COGERÁ DE LA B.U.L., hasta la base de la A.E.A.
  · Tercio de 30 metros y 45 mm Ø a la tubería de la A.E.A., CON LA EXCEPCIÓN DE LA E-9, QUE IRÁ ATADO AL ÚLTIMO PELDAÑO.'),
('C051-0017','herramienta de corte debe ser:','
- DURO: altamente resistente al desgaste.
- RESISTENCIA DE LOS FILOS A LAS ALTAS TEMPERATURAS: la fricción eleva la temperatura de los filos pero mantiene las propiedades para el corte.
- RESILIENCIA: capacidad de absorber y almacenar la energía de deformación, evitando grietas o fracturas.
- TENACIDAD: cuantifica la cantidad de energía almacenada por el material antes de romperse.
- REDUCIDO COEFICIENTE DE…'),
('C051-0040','ón de fragmentos o partículas;',' sobreesfuerzos; contactos térmicos; daños por exposición a agentes físicos (RUIDOS Y VIBRACIONES); presencia de cables eléctricos en las zonas de paso.'),
('C051-0048','e trabajo limpias y ordenadas;',' evitar o minimizar posturas forzadas y sobreesfuerzos.'),
('C051-0063','les blindados, cristal armado;',' CHAPA DE ACERO (hasta 8 mm de grosor); chapas de COBRE Y ALUMINIO (hasta 15 mm); tela asfáltica y cartón embetunado; construcciones de madera con clavos individuales (diámetro inferior a 35 mm); material de aislamiento, encofrados de chapa; paredes de naves de construcción ligera; puertas de rodillos de aluminio; mampostería ligera.'),
('C051-0091','a de aire en posición CERRADA;',' bloqueo del acelerador a media velocidad; en lugar despejado y con la motosierra EN EL SUELO; PIE DERECHO en empuñadura trasera; MANO IZQUIERDA sobre empuñadura delantera; tirar de la cuerda de arranque; en cuanto el motor dé las primeras explosiones, abrir el dispositivo de entrada de aire y desbloquear el acelerador.'),
('C051-0105','iones por personal autorizado;',' impedir que se acerquen niños, animales y espectadores; NO TRABAJAR EN LUGARES CERRADOS o mal ventilados AUNQUE TENGA CATALIZADOR (gases de escape tóxicos, que pueden ser INODOROS E INVISIBLES); en zanjas, fosos o espacios reducidos, asegurar ventilación.'),
('C051-0115',' cadena de corte y barra guía;',' comprobar los ÁNGULOS DE LOS DIENTES y su AFILADO (se mellan fácilmente al tocar metal, piedras o arena); comprobar el engrasado.'),
('C051-0118','TRO DE AIRE (cepillo o brocha;',' si se requiere, agua y jabón y soplar con compresor; tener un filtro de repuesto); CADENA (desgaste de eslabones, remaches agrietados, ajustar altura de los ANDARINES); MANIJA DELANTERA Y FRENO DE CADENA (limpiar bajo la barra protectora, alrededor del embrague y freno; verificar funcionamiento).'),
('C051-0119',' tener un filtro de repuesto);',' CADENA (desgaste de eslabones, remaches agrietados, ajustar altura de los ANDARINES); MANIJA DELANTERA Y FRENO DE CADENA (limpiar bajo la barra protectora, alrededor del embrague y freno; verificar funcionamiento).'),
('C051-0178','dos: valorar trabajar con EPR;',' CORTAR AMIANTO (URALITA) ES CANCERÍGENO; ropa con puños ajustables, sin colgantes ni cadenas; EPI del Plan de Seguridad y Salud.'),
('C051-0200','por tres mecanismos:','
- DESLIZAMIENTO de la cadena: al contacto, la cadena no corta el material.
- ATRAPAMIENTO: la cadena arrastra las fibras hasta el PIÑÓN DE ARRASTRE y bloquea el movimiento.
- FRENADO de la cadena: las fibras, de alta resistencia al corte, absorben la energía rotacional y reducen la velocidad.'),
('C051-0238','s, maniobra de TERCERA PUERTA;',' corte de BANDEJA en vehículos de cuatro puertas.'),
('C051-0251',' dejarla expuesta a la lluvia;',' puede originar FUERTES VIBRACIONES al cortar partes amplias.'),
('C051-0255','E; verificar estado del MOTOR;',' inspección de ESCOBILLAS DE CARBÓN y, en su caso, reemplazar; revisar la lista de repuestos; verificar estado de la BATERÍA.'),
('C051-0266','E: efectúa la mezcla de gases;',' consta de dos conexiones con las mangueras (gas de la llama calefactora y oxígeno de corte), dos llaves de regulación, el inyector, la cámara de mezcla y la boquilla; VÁLVULAS ANTIRRETROCESO: dispositivos de seguridad que permiten el paso de gas EN UN SOLO SENTIDO (envolvente, cuerpo metálico, válvula de retención y válvula de seguridad contra sobrepresiones); MANGUERAS: rígidas o flexibles.'),
('C051-0311','cos; exposición a RADIACIONES;',' explosiones; incendios; posturas forzadas; daños por agentes químicos (gases) y físicos (radiaciones).'),
('C051-0318','en ventilado o con extracción;',' señalizar el almacenamiento con «PELIGRO DE EXPLOSIÓN» y «PROHIBIDO FUMAR»; en cortes in situ limitar la cascada de chispas con MANTA IGNÍFUGA; equipo fuera de zonas de paso; sin otras personas en el entorno (si no, MAMPARAS o protecciones individuales); almacenar en lugares cubiertos.'),
('C051-0328','bio de mangueras deterioradas;',' comprobar la existencia de VÁLVULAS ANTIRRETROCESO en el manómetro y caña; limpiar periódicamente la BOQUILLA del soplete; grifos y manorreductores de las botellas de OXÍGENO siempre LIMPIOS DE GRASAS, aceites o combustible; NO UTILIZAR EL OXÍGENO para limpiar o soplar piezas ni para ventilar una estancia; no trabajar con ropa sucia de grasa, disolvente o sustancias inflamables.'),
('C051-0335',' FUERA DEL RECINTO DE TRABAJO;',' mangueras sin contacto con productos químicos, superficies calientes, elementos cortantes; evitar BUCLES O NUDOS.'),
('C051-0354','lamiento, encofrados de chapa;',' paredes de naves de construcción ligera; puertas de rodillos de aluminio; mampostería ligera.'),
('C051-0355','TRO SISTEMAS de la motosierra:','
- SISTEMA DE AGARRE: empuñadura DELANTERA y TRASERA.
- SISTEMA MOTRIZ: engrase por MEZCLA GASOLINA-ACEITE en proporción 2-5 %; refrigeración por AIRE; carburador de MEMBRANA.
- SISTEMA DE CORTE: ESPADÍN de unos 40 cm, cadena con DIENTES DE GUBIA y LUBRICACIÓN AUTOMÁTICA.
- SISTEMA DE SEGURIDAD: SEGURO DE BLOQUEO DE ACELERADOR, PROTECTOR SALVAMANOS, FRENO DE CADENA y SISTEMA ANTIVIBRATORIO en empuñadura.'),
('C051-0365','irar de la cuerda de arranque;',' en cuanto el motor dé las primeras explosiones, abrir el dispositivo de entrada de aire y desbloquear el acelerador.'),
('C051-0366','SOBRE LOS HOMBROS O LA CABEZA;',' evitar cables eléctricos en zonas de paso; el suministro eléctrico con MANGUERA ANTI-HUMEDAD; no abandonar el equipo en funcionamiento; no cortar en zonas poco accesibles ni posiciones forzadas; NO TOCAR LA CADENA después de utilizarla; reparaciones por personal autorizado; impedir que se acerquen niños, animales y espectadores; NO TRABAJAR EN LUGARES CERRADOS o mal ventilados AUNQUE TENGA CATALIZADOR (gases de…'),
('C051-0368',' LAS DOS MANOS, postura firme;',' acercar al corte ACELERANDO A FONDO y aplicar firmemente el TOPE DE GARRAS; retirar la motosierra de la madera CON LA CADENA EN FUNCIONAMIENTO; manejar con serenidad, cautela y prudencia, en buenas condiciones de luz y visibilidad.'),
('C051-0372','r con el MOTOR FRÍO Y APAGADO;',' evitar derrames, abrir el cierre con cuidado para liberar la SOBREPRESIÓN; solo en lugares bien ventilados; en caso de derrame, limpiar la máquina y si es necesario cambiar la ropa.'),
('C051-0378','lo en lugares bien ventilados;',' en caso de derrame, limpiar la máquina y si es necesario cambiar la ropa.'),
('C051-0386','ANTO (URALITA) ES CANCERÍGENO;',' ropa con puños ajustables, sin colgantes ni cadenas; EPI del Plan de Seguridad y Salud.'),
('C051-0389','NO ARRANCAR AL AIRE;',' nadie en la zona de trabajo ni afectado por lo que se corte; nunca transportar la máquina funcionando o con el dedo en el interruptor; NO UTILIZAR PARA DEVASTAR (la PRESIÓN LATERAL puede romper el disco); mantenerse fuera de la dirección del corte y de la salida de chispas; gases tóxicos en lugares reducidos: valorar trabajar con EPR; CORTAR AMIANTO (URALITA) ES CANCERÍGENO; ropa con puños ajustables, sin colgantes…'),
('C051-0399','L 100 %), por tres mecanismos:','
- DESLIZAMIENTO de la cadena: al contacto, la cadena no corta el material.
- ATRAPAMIENTO: la cadena arrastra las fibras hasta el PIÑÓN DE ARRASTRE y bloquea el movimiento.
- FRENADO de la cadena: las fibras, de alta resistencia al corte, absorben la energía rotacional y reducen la velocidad.'),
('C051-0411','mentación; interruptor en OFF;',' cable de prolongación si el área está alejada de la red; montaje y desmontaje de la hoja.'),
('C051-0415','DOS ETAPAS del proceso:','
1.ª El acero se CALIENTA a alta temperatura (900 °C) con la llama producida por el OXÍGENO y un gas COMBUSTIBLE cualquiera (acetileno, hidrógeno, propano, hulla, tetreno o crileno).'),
('C051-0430','r desplome y por manipulación;',' pisadas sobre objetos; proyección de fragmentos; contactos térmicos; inhalación o ingestión de agentes químicos; exposición a RADIACIONES; explosiones; incendios; posturas forzadas; daños por agentes químicos (gases) y físicos (radiaciones).'),
('C051-0431','encendedor de CHISPA;',' evitar que las chispas caigan sobre botellas o mangueras; NO COLGAR NUNCA EL SOPLETE DE LAS BOTELLAS aunque esté apagado; no tocar piezas recién cortadas; no abandonar el equipo en funcionamiento.'),
('C052-0036','1/1995 de PRL), en DOS GRUPOS:','
- REAL DECRETO 1644/2008 (dirigido al FABRICANTE E IMPORTADOR): normas de COMERCIALIZACIÓN Y PUESTA EN SERVICIO de las máquinas. Persigue que solo circulen máquinas que cumplan los estándares de seguridad: DECLARACIÓN DE CONFORMIDAD y MARCADO CE, que posibilita la puesta en servicio y la libre comercialización en la UE.
- REAL DECRETO 1215/1997 (dirigido al EMPRESARIO O EMPLEADOR): disposiciones mínimas de…'),
('C052-0065','S CARACTERÍSTICAS principales:','
- EFICACIA: capacidad para realizar el trabajo para el que están pensadas.
- ERGONOMÍA: forma y tamaño compatibles con las características ANTROPOMÉTRICAS Y BIOMECÁNICAS del trabajador. El diseño ergonómico contempla: diseño y dimensiones (sobre todo del agarre) adaptados a la mayoría de la población; postura cómoda (correcta y no forzada); peso y medidas adecuados; considera la DIRECCIÓN DEL ESFU'),
('C052-0097','BLA 1 · Tipología de taladros:','
- Por ENERGÍA: MANUALES (rotación manual: BERBIQUÍS o taladro manual de pecho); ELÉCTRICOS (portátiles o por cable); NEUMÁTICO O HIDRÁULICO (aire comprimido o líquido); DE MOTOR DE COMBUSTIÓN INTERNA (gasolina o diésel; SOLO donde no se dispone de corriente eléctrica).
- Por MECANISMO: TALADRO PERCUTOR (superficies muy duras: baldosas, ladrillos; giro y vaivén; cuando tienen mucha potencia se llam'),
('C052-0321','en el mango y otra en el arco;',' velocidad MODERADA para que la hoja no se rompa.'),
('C052-0329','peso y medidas adecuados;',' considera la DIRECCIÓN DEL ESFUERZO y los MOMENTOS DE REACCIÓN; reduce la fuerza muscular a aplicar.'),
('C052-0330',' incluyen también aquellas que',', CON INDEPENDENCIA DE LA ENERGÍA requerida para su accionamiento (ELECTRICIDAD, COMBUSTIBLE O SISTEMAS HIDRÁULICOS), sean SOSTENIDAS DE FORMA MANUAL.'),
('C052-0334','ÍS o taladro manual de pecho);',' ELÉCTRICOS (portátiles o por cable); NEUMÁTICO O HIDRÁULICO (aire comprimido o líquido); DE MOTOR DE COMBUSTIÓN INTERNA (gasolina o diésel; SOLO donde no se dispone de corriente eléctrica).'),
('C052-0335','ría permite quitar el vaivén);',' ELECTRÓNICO (regula la velocidad de giro con el gatillo); REVERSIBLE (gira en ambos sentidos; útiles como destornilladores).'),
('C052-0338','a velocidad según el material;',' primero VELOCIDAD BAJA para comenzar el agujero y luego subir y mantener constante; sujetar bien la pieza.'),
('C052-0339','elgadas perfectamente sujetas:',' al atravesarlas se produce un EFECTO DE TORNILLO por el que la pieza SUBE POR LA BROCA; apagar (mejor DESENCHUFAR) para cambio de broca o limpieza; medidas comunes de los aparatos eléctricos (humedad, calor, no tirar del cable).'),
('C052-0342','mplir las normas de seguridad:',' el mantenimiento se efectuará SOLAMENTE POR ELECTRICISTAS ESPECIALIZADOS, con recambios ORIGINALES.'),
('C052-0344',' su versión PORTÁTIL O MANUAL:',' dos piezas paralelas o ligeramente convergentes unidas a intervalos por travesaños; ligera y transportable con las manos.'),
('C052-0345','as más utilizadas en bomberos:','
- ESCALERA DE GANCHO: principalmente para SALVAMENTO y auxiliar; colgarse en balcones, trepar fachadas, batir tapias, subir a marquesinas, tirar o sanear fachadas a poca altura, subir a tejados de planta baja, descender de un balcón a otro, como PUENTE, pisar tejados de PIZARRA, saltar tapias. Largueros de MADERA de unos 4 m enlazados por 13 TRAVESAÑOS también de madera; en los extremos superiores un GANCHO DE…'),
('C052-0348','intervalo NO MENOR DE 36 cm;',' los de metal corrugados o con hoyuelos, pueden llevar antideslizante).'),
('C052-0349','scaleras de extensión, además:',' TRAMO PRINCIPAL O BÁSICO (parte inferior, también «CAMA»); EXTENSIÓN O VOLANTE (superior); GANCHOS; GUÍAS; CABO O CABLE (cuerda para extender las secciones); POLEA.'),
('C052-0350','XTENSIÓN O VOLANTE (superior);',' GANCHOS; GUÍAS; CABO O CABLE (cuerda para extender las secciones); POLEA.'),
('C052-0352','generalmente UNA persona;',' al hombro, metido entre los PELDAÑOS 6 Y 7, ganchos HACIA DELANTE Y HACIA DENTRO.'),
('C052-0353','s ganchos quedan hacia afuera;',' para colgarla, semiflexión de piernas, se eleva a la altura del balcón con un GIRO DE 180º para que los ganchos entren en la balaustrada.'),
('C052-0354','asta que los ganchos penetren;',' para subir de planta en planta, sacar los brazos por la ventana, cogerla por los largueros, girarla 180º para liberar los ganchos, ascender con amplias brazadas, media vuelta y volver a colgar; para alturas elevadas se ata por el REGATÓN.'),
('C052-0355','r cables eléctricos, tuberías;',' no cerca de aberturas, huecos de ascensor o ventanas sin proteger); elementos antidesprendimiento en la base; en escaleras con ruedas, inmovilizarlas; por encima de 3,5 m con esfuerzos peligrosos, sistemas individuales ANTICAÍDA; NO pueden utilizarse por DOS O MÁS PERSONAS simultáneamente; prohibido transportar cargas que comprometan la seguridad; prohibidas las de CONSTRUCCIÓN IMPROVISADA; travesaños en…'),
('C052-0356','yo (puntos sólidos y estables;',' evitar cables eléctricos, tuberías; no cerca de aberturas, huecos de ascensor o ventanas sin proteger); elementos antidesprendimiento en la base; en escaleras con ruedas, inmovilizarlas; por encima de 3,5 m con esfuerzos peligrosos, sistemas individuales ANTICAÍDA; NO pueden utilizarse por DOS O MÁS PERSONAS simultáneamente; prohibido transportar cargas que comprometan la seguridad; prohibidas las de CONSTRUCCIÓN…'),
('C052-0357','as con ruedas, inmovilizarlas;',' por encima de 3,5 m con esfuerzos peligrosos, sistemas individuales ANTICAÍDA; NO pueden utilizarse por DOS O MÁS PERSONAS simultáneamente; prohibido transportar cargas que comprometan la seguridad; prohibidas las de CONSTRUCCIÓN IMPROVISADA; travesaños en horizontal; carga a mano sin impedir sujeción segura; NO usar escaleras de más de 5 m de longitud si no está garantizada su resistencia estructural; las de…'),
('C052-0360','revisión tras cada trabajo;',' apretar los tornillos de los ganchos y principalmente el REGATÓN, que es el que con más facilidad se afloja; lijar los largueros para quitar astillas; apretar las CUÑAS que presionan los travesaños.'),
('C052-0368','e que facilite el desmontaje);',' DESMONTABLE (mango desmontable por su parte central para transporte en avionetas, helicópteros, vehículos; montaje por acoplamiento con CONIFICACIÓN y sujeción con DOS PITONES móviles a presión por FLEJE DE ACERO); DE TIRAS (OCHO batidores de 40 × 800 mm de tejido ACRÍLICO permanentemente IGNÍFUGO unidos por cinta cosida; mango de 25 mm de ALUMINIO ANODIZADO con agarre antideslizante y anti-sudor).'),
('C052-0370','CA (abrir ventanas y puertas);',' ESTAMPIDOR (romper puertas golpeándolas A MODO DE ARIETE); BICHERO CON MANGO (romper techos y paredes y alcanzar objetos alejados); MARTILLO (golpear).'),
('C052-0371','CA (abrir ventanas y puertas);',' ESTAMPIDOR (romper puertas golpeándolas A MODO DE ARIETE); BICHERO CON MANGO (romper techos y paredes y alcanzar objetos alejados); MARTILLO (golpear).'),
('C052-0372','TIPOS por la forma de la pala:',' DE PUNTA REDONDA (redondeada y ligeramente en punta, fácil de hincar, para CAVAR; borde superior plano para el pie; es la de los servicios de bomberos: «PALA FORESTAL»); DE PUNTA CUADRADA (mayor superficie, para TRANSPORTAR materiales); DE ZAPA (punta cuadrada más estrecha; césped, bordes); DE TRASPLANTAR (estrecha, ligeramente en punta).'),
('C053-0049','mango, vástago o caña y punta;',' puntas PLANAS o DE ESTRELLA; eléctricos o manuales.'),
('C053-0053','TADOR DE CABLE (pelar cables);',' interior aplanado y rugoso; mango cubierto de plástico u otro material AISLANTE.'),
('C053-0070','ntre, talón o base y lengüeta;',' rebajes MÁS TOSCOS que la lima pero eliminan con rapidez la madera saliente de superficies curvas.'),
('C053-0077','iones generales de seguridad»;',' Reglamento de Seguridad en Máquinas RD 1495/1986; RD 1435/1992 (aproximación de legislaciones sobre máquinas); Normas Armonizadas Europeas.'),
('C053-0102','ar); retirar llaves de ajuste;',' base firme y equilibrio; sin ropa amplia ni JOYAS; pelo y guantes lejos de piezas móviles; ASPIRACIÓN de polvo si es posible.'),
('C053-0141',' desconectar para transportar;',' hojas que sobresalgan al menos 40 MM de la pieza (evita contragolpes); presión moderada con el adaptador de conductos grandes; las VIRUTAS (sobre todo metálicas) queman; nunca sin protección de manos; determinar la peligrosidad del POLVO; sujetar la pieza; útiles bien enclavados; si se corta la corriente, desconectar y desenchufar; no varias herramientas en una regleta múltiple.'),
('C053-0147',', 1,5 mm² 20 m y 2,5 mm² 40 m;',' a 230 V, 1,5 mm² 50 m y 2,5 mm² 100 m.'),
('C053-0150','; cambiar el selector orbital;',' mínimo desplazamiento de zapata; hoja más fina o más corta; más carreras; otro dentado; mejor sujeción.'),
('C053-0153','za (en especial los gorrones);',' el extremo de la hoja debe quedar LIBRE en su carrera (salvo corte por inmersión); tras uso intenso, revisión del servicio técnico; reparaciones eléctricas solo por electricista especializado; nunca con las RANURAS DE VENTILACIÓN obstruidas (cepillo seco); trapo ligeramente húmedo; empuñaduras sin grasa; NINGÚN producto con SILICONA; revisar partes y mandos; tras el mantenimiento, comprobar protección de manos y…'),
('C053-0157',' NINGÚN producto con SILICONA;',' revisar partes y mandos; tras el mantenimiento, comprobar protección de manos y zapata.'),
('C053-0177',' apoyar otra parte del cuerpo;',' GUANTES en frío (reduce efectos de la vibración); no dejarlo HINCADO; no transportarlo en marcha ni con el dedo en el interruptor; no tocar la herramienta caliente; junto a bordes, LÍNEA DE VIDA para el usuario y la herramienta.'),
('C053-0179','tocar la herramienta caliente;',' junto a bordes, LÍNEA DE VIDA para el usuario y la herramienta.'),
('C053-0198','TADOR DE CABLE (pelar cables);',' interior aplanado y rugoso; mango cubierto de plástico u otro material AISLANTE.'),
('C053-0225','nunca sin protección de manos;',' determinar la peligrosidad del POLVO; sujetar la pieza; útiles bien enclavados; si se corta la corriente, desconectar y desenchufar; no varias herramientas en una regleta múltiple.'),
('C054-0057','a que las escaleras mecánicas;',' la diferencia es que su piso tiene PLACAS MÓVILES dispuestas como BANDA CONTINUA.'),
('C054-0068','AMIENTO ELÉCTRICO Y MECÁNICO—;',' 2) batientes en piso y LIBRILLO en cabina; 3) batiente en pisos y telescópica automática en cabina; 4) telescópicas automáticas en pisos y cabina; 5) apertura central automática en pisos y cabina; 6) apertura central telescópica automática en pisos y cabina.'),
('C054-0069','escópica automática en cabina;',' 4) telescópicas automáticas en pisos y cabina; 5) apertura central automática en pisos y cabina; 6) apertura central telescópica automática en pisos y cabina.'),
('C054-0071','automáticas en pisos y cabina;',' 5) apertura central automática en pisos y cabina; 6) apertura central telescópica automática en pisos y cabina.'),
('C054-0122','N de 10 de septiembre de 1998;',' RD 57/2005, de 21 de enero (incremento de la seguridad del parque existente); RD 560/2010, de 7 de mayo (adaptación a las Leyes 17/2009 y 25/2009) y su corrección de errores.'),
('C054-0136','ue no pueda volver a arrancar;',' 3) COMPROBAR la situación de la cabina desde la PLANTA MÁS BAJA, desenclavar la puerta y volverla a enclavar; 4) antes de desplazar la cabina, asegurar el CIERRE DE TODAS LAS PUERTAS (planta y cabina); 5) COMUNICAR permanentemente al equipo los pormenores.'),
('C054-0156','s el cierre de las interiores;',' 3) REARMAR el interruptor de puesta en marcha (por lo general el AUTOMÁTICO GENERAL o el DIFERENCIAL está fuera de servicio); 4) accionar el PULSADOR DE PLANTA.'),
('C054-0193',' de la cabina en cada momento;',' estado y ubicación de la cabina para desplazarla con seguridad.'),
('C054-0195','n cascada de cuatro preguntas:',' 1) ¿Es posible y segura la puesta en marcha normal? SÍ → ponerlo en marcha y llevarlo a un punto de rescate. NO → 2) ¿Es posible el rescate sin mover la cabina? SÍ → cortar y comprobar ausencia de suministro y rescatar. NO → 3) En ascensores SIN cuarto de máquinas, ¿es posible mover la cabina con el SISTEMA ELÉCTRICO DE EMERGENCIA? SÍ → moverla con él hasta el punto de rescate. NO → 4) ¿Es posible'),
('C054-0205','ente en el cuarto de máquinas;',' 2) rescatar por la PARTE INFERIOR de la cabina (desplazarla agravaría la situación); 3) apoyar y asegurar una ESCALERA en el fondo del hueco, sujetarla contra el vuelco y ASEGURAR al bombero que actúa sobre ella; 4) colocar un COJÍN NEUMÁTICO DE MEDIA PRESIÓN entre la pared y la PISADERA de la cabina para desplazarla hacia el fondo del hueco, sin que la persona caiga; 5) liberar el miembro y meterlo en la cabina;…'),
('C054-0208','eco, sin que la persona caiga;',' 5) liberar el miembro y meterlo en la cabina; 6) maniobra de rescate si la dirección no está condicionada por el espacio libre, o despresurizar el cojín y mover la cabina hasta nivel de planta; 7) despresurizar el cojín al terminar; 8) verificar el cierre de las puertas.'),
('C054-0209','iembro y meterlo en la cabina;',' 6) maniobra de rescate si la dirección no está condicionada por el espacio libre, o despresurizar el cojín y mover la cabina hasta nivel de planta; 7) despresurizar el cojín al terminar; 8) verificar el cierre de las puertas.'),
('C054-0211',' cabina hasta nivel de planta;',' 7) despresurizar el cojín al terminar; 8) verificar el cierre de las puertas.'),
('C054-0219',' cuarto de máquinas o armario;',' INSTRUCCIONES INICIALES según esquema SI.M.E.S.: EPI, apertura del cuarto, DESCONEXIÓN del circuito de fuerza; INFORME FLASH al CECOP en menos de 15 MINUTOS: «Estoy + Veo + Recursos suficientes / dudas / Pido»); 2.º PLAN DE ACTUACIÓN (rescate SIN y CON movimiento de cabina, según el manual y su diagrama de flujo); 3.º FIN DE ACTUACIÓN (ascensor NO OPERATIVO, puertas cerradas y enclavadas, «FIN DE SERVICIO» al…'),
('C054-0220','NEXIÓN del circuito de fuerza;',' INFORME FLASH al CECOP en menos de 15 MINUTOS: «Estoy + Veo + Recursos suficientes / dudas / Pido»); 2.º PLAN DE ACTUACIÓN (rescate SIN y CON movimiento de cabina, según el manual y su diagrama de flujo); 3.º FIN DE ACTUACIÓN (ascensor NO OPERATIVO, puertas cerradas y enclavadas, «FIN DE SERVICIO» al CECOP); 4.º LLEGADA A PARQUE («PARQUE DISPONIBLE»).'),
('C054-0245','portan el peso de una persona;',' el FALDÓN RETRÁCTIL (huecos de foso reducido) se despliega antes con la misma llave de triángulo.'),
('C054-0246','OMPLETO y para en PLANTA BAJA;',' no funciona si los pasajeros tienen la puerta de cabina abierta (SERIE DE SEGURIDAD abierta); ordenarles cerrar y situarse al FONDO.'),
('C054-0248',' esperar UN MINUTO al reseteo;',' si persiste, elegir maniobra específica según situación de cabina y tipo de máquina.'),
('C054-0258','; comunicación imprescindible;',' al terminar, puertas enclavadas, fuerza desconectada y puerta del cuarto cerrada.'),
('C054-0277','O en PLANTA BAJA o por debajo;',' sin cuarto, maquinaria en el FOSO y cuadro de maniobras en planta baja.'),
('C054-0286',' las instrucciones de rescate;',' 6) accionar el BOTÓN O TIRADOR ROJO que permite el DESCENSO de la cabina hasta la posición de rescate —todos los fabricantes incorporan sistemas VISUALES o ACÚSTICOS que indican cabina en planta—; 7) si hay que SUBIR la cabina para el desenclave, localizar la PALANCA DE ACCIONAMIENTO HIDRÁULICO; 8) desenclavar la puerta; 9) permitir la salida.'),
('C054-0287','bar la ausencia de suministro;',' 2) asegurar el cierre de todas las puertas; 3) confirmar con los pasajeros el cierre de las interiores; 4) localizar la zona de accionamiento de la maquinaria; 5) leer las instrucciones de rescate; 6) accionar el BOTÓN O TIRADOR ROJO que permite el DESCENSO de la cabina hasta la posición de rescate —todos los fabricantes incorporan sistemas VISUALES o ACÚSTICOS que indican cabina en planta—; 7) si hay que SUBIR la…'),
('C054-0288','s el cierre de las interiores;',' 4) localizar la zona de accionamiento de la maquinaria; 5) leer las instrucciones de rescate; 6) accionar el BOTÓN O TIRADOR ROJO que permite el DESCENSO de la cabina hasta la posición de rescate —todos los fabricantes incorporan sistemas VISUALES o ACÚSTICOS que indican cabina en planta—; 7) si hay que SUBIR la cabina para el desenclave, localizar la PALANCA DE ACCIONAMIENTO HIDRÁULICO; 8) desenclavar la puerta;…'),
('C054-0303','ara personas con discapacidad;',' características especiales de LUZ, DIMENSIONES, PARADA A NIVEL y SITUACIÓN DEL SISTEMA DE CONTROL.'),
('C054-0306','or y el CONTRAPESO. Elementos:','
a) CABINA: recinto para el transporte de pasajeros.
b) PUERTAS DE ACCESO: de PLANTA y de CABINA. SEIS tipologías: 1) batientes en piso y cabina —las batientes o automáticas de piso llevan un SEGURO que las bloquea salvo que la puerta de cabina esté justo detrás y a nivel: ENCLAVAMIENTO ELÉCTRICO Y MECÁNICO—; 2) batientes en piso y LIBRILLO en cabina; 3) batiente en pisos y telescópica automática en cabina; 4)…'),
('C054-0310','s el cierre de las interiores;',' 3) REARMAR el interruptor de puesta en marcha (por lo general el AUTOMÁTICO GENERAL o el DIFERENCIAL está fuera de servicio); 4) accionar el PULSADOR DE PLANTA.'),
('C054-0312','mando con aparatos eléctricos;',' si llega a 700 ºC sobre la cara exterior de las puertas de piso o en cuartos de máquinas sin aparatos eléctricos; si el ascensor RECIBE AGUA.'),
('C054-0320','guantes y calzado DIELÉCTRICO;',' equipo anticaídas; LLAVE de desenclavamiento; linternas; comunicaciones; escaleras pequeñas; caja de herramientas.'),
('C054-0337','EGURIDAD en toda intervención:',' 1) CORTAR el suministro eléctrico siempre que se maniobre en el cuarto de máquinas, el recinto o el foso; 2) BLOQUEAR el interruptor o limitar el acceso al cuadro general para que no pueda volver a arrancar; 3) COMPROBAR la situación de la cabina desde la PLANTA MÁS BAJA, desenclavar la puerta y volverla a enclavar; 4) antes de desplazar la cabina, asegurar el CIERRE DE TODAS LAS PUERTAS (planta y cabina); 5)…'),
('C054-0344',' IMPEDIDAS o de AVANZADA EDAD;',' lo más sensato es valorar los riesgos y usarlos hasta donde sea posible.')) as v(id, cola, ext)
  where b.id = v.id and right(b.cita, 30) = v.cola and (b.editada_at is null or b.id = 'C001-0021')
  returning 1)
select 'lote 6: ' || count(*) || ' de 160 citas ampliadas' as resultado from u;
