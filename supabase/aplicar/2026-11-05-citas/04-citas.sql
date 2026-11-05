-- Lote 4: amplía la cita (texto literal que sigue en el bloque del corpus) de 160 preguntas.
-- Guardas: solo si la cita actual acaba exactamente como la que se amplió, y no está editada a mano.
with u as (
  update public.banco_preguntas b set cita = b.cita || v.ext, editada_at = now()
  from (values
('C030-0138',' a) CINCO BOMBEROS Y UN MANDO;',' b) DOS autobombas rurales o urbanas; c) UNA autobomba forestal; d) UN vehículo de mando; e) UN vehículo de rescate/excarcelación; f) UNA autoescala o vehículo de altura; g) UNA nodriza.'),
('C030-0139',' autobombas rurales o urbanas;',' c) UNA autobomba forestal; d) UN vehículo de mando; e) UN vehículo de rescate/excarcelación; f) UNA autoescala o vehículo de altura; g) UNA nodriza.'),
('C030-0142',': a) TRES BOMBEROS Y UN MANDO;',' b) UNA autobomba rural o urbana; c) UNA autobomba forestal; d) UN vehículo de mando; e) UN vehículo de rescate/excarcelación.'),
('C030-0145',' UNA autobomba rural o urbana;',' c) UNA autobomba forestal; d) UN vehículo de mando; e) UN vehículo de rescate/excarcelación.'),
('C030-0147','UES DE APOYO: a) DOS BOMBEROS;',' b) UN vehículo de extinción CON DEPÓSITO DE 500 LITROS.'),
('C030-0168','ecución del Plan de formación;',' seguimiento de la ejecución del presupuesto de gasto; organizar las actividades de carácter preventivo; SUSTITUIR AL JEFE DEL SERVICIO en su ausencia; evaluar la aplicación de los procedimientos de intervención; cumplir y hacer cumplir funciones, normas de uniformidad y conducta, convivencia, Seguridad e Higiene y perfeccionamiento; establecer cauces de comunicación para la sensibilización ciudadana.'),
('C030-0169',' BAJAS Y ALTAS por enfermedad;',' coordinar y supervisar la ENTREGA Y DISTRIBUCIÓN de vestuario, equipos y materiales; colaborar en la elaboración de informes; dirigir la intervención cuando lo requiera el Jefe del Servicio; cualquier otra encomendada por el Jefe del Servicio.'),
('C030-0170','cutar el presupuesto aprobado;',' ostentar la responsabilidad de la EFICACIA Y CALIDAD del Servicio; planificar la formación y coordinarla CON LA ACADEMIA ARAGONESA DE BOMBEROS; dirigir todos los medios y recursos tanto en normalidad como en emergencias que requieran su presencia; supervisar el control de los recursos humanos; coordinar las acciones de los responsables definiendo criterios generales; APROBAR LOS CUADRANTES DE SERVICIO; presentar la…'),
('C030-0171','E DEL SERVICIO en su ausencia;',' evaluar la aplicación de los procedimientos de intervención; cumplir y hacer cumplir funciones, normas de uniformidad y conducta, convivencia, Seguridad e Higiene y perfeccionamiento; establecer cauces de comunicación para la sensibilización ciudadana.'),
('C030-0172','s, vehículos, vestuario y EPI;',' coordinar la SEGURIDAD Y SALUD en los centros de trabajo; elaborar informes de planificación, proyectos y métodos; INFORMAR SOBRE LOS PLANES DE AUTOPROTECCIÓN y las condiciones de prevención y protección contra incendios; dirigir la intervención cuando lo requiera el Jefe del Servicio; cualquier otra encomendada por el Jefe del Servicio.'),
('C030-0176','OORDINAR el Plan de formación;',' planificar y organizar los recursos humanos para cumplir los objetivos de intervención; proponer al Jefe de Servicio la ADQUISICIÓN de materiales, vehículos, vestuario y EPI; coordinar la SEGURIDAD Y SALUD en los centros de trabajo; elaborar informes de planificación, proyectos y métodos; INFORMAR SOBRE LOS PLANES DE AUTOPROTECCIÓN y las condiciones de prevención y protección contra incendios; dirigir la…'),
('C030-0177','E DEL SERVICIO en su ausencia;',' evaluar la aplicación de los procedimientos de intervención; cumplir y hacer cumplir funciones, normas de uniformidad y conducta, convivencia, Seguridad e Higiene y perfeccionamiento; establecer cauces de comunicación para la sensibilización ciudadana.'),
('C030-0186','L, tres tipos de intervención:','
a) PRIMER NIVEL: interviene una dotación compuesta por UN vehículo ligero o pesado con su dotación de bomberos.
b) SEGUNDO NIVEL: intervienen AL MENOS 2 dotaciones de primer nivel, DE LAS QUE AL MENOS UNA está compuesta por VEHÍCULO PESADO.
c) INTERVENCIÓN ESPECIAL: los recursos que intervienen tienen consideración de recursos específicos.
EN TODAS LAS INTERVENCIONES SE INCORPORARÁ UN MANDO DE BOMBEROS.'),
('C030-0197',' a) CINCO BOMBEROS Y UN MANDO;',' b) DOS autobombas rurales o urbanas; c) UNA autobomba forestal; d) UN vehículo de mando; e) UN vehículo de rescate/excarcelación; f) UNA autoescala o vehículo de altura; g) UNA nodriza.'),
('C030-0209',' UNA autobomba rural o urbana;',' c) UNA autobomba forestal; d) UN vehículo de mando; e) UN vehículo de rescate/excarcelación.'),
('C030-0211','toescala o vehículo de altura;',' g) UNA nodriza.'),
('C031-0029',' la infraestructura de la vía;','
- los vehículos que acudan a realizar un servicio de auxilio en carretera.'),
('C031-0030','n en servicio de tal carácter;','
- los equipos de mantenimiento de las instalaciones y de la infraestructura de la vía;
- los vehículos que acudan a realizar un servicio de auxilio en carretera.'),
('C031-0033','os y otros usuarios de la vía:','
- los vehículos de servicio de urgencia, cuando se hallen en servicio de tal carácter;
- los equipos de mantenimiento de las instalaciones y de la infraestructura de la vía;
- los vehículos que acudan a realizar un servicio de auxilio en carretera.'),
('C031-0039','plicable a los conductores de:','
- vehículos destinados al transporte de mercancías con MMA superior a 3.500 kg;
- vehículos destinados al transporte de viajeros de más de nueve plazas, o de servicio público;
- transporte escolar y de menores;
- transporte de mercancías peligrosas;
- SERVICIO DE URGENCIA;
- transportes especiales.'),
('C031-0040','s con MMA superior a 3.500 kg;','
- vehículos destinados al transporte de viajeros de más de nueve plazas, o de servicio público;
- transporte escolar y de menores;
- transporte de mercancías peligrosas;
- SERVICIO DE URGENCIA;
- transportes especiales.'),
('C031-0041','plazas, o de servicio público;','
- transporte escolar y de menores;
- transporte de mercancías peligrosas;
- SERVICIO DE URGENCIA;
- transportes especiales.'),
('C031-0042','s con MMA superior a 3.500 kg;','
- vehículos destinados al transporte de viajeros de más de nueve plazas, o de servicio público;
- transporte escolar y de menores;
- transporte de mercancías peligrosas;
- SERVICIO DE URGENCIA;
- transportes especiales.'),
('C031-0048','drán someter a dichas pruebas:','
a) A cualquier usuario de la vía o conductor implicado directamente como posible responsable en un accidente de circulación.
b) A quienes conduzcan cualquier vehículo con síntomas evidentes, manifestaciones que denoten o hechos que permitan razonablemente presumir que lo hacen bajo la influencia de bebidas alcohólicas.
c) A los conductores denunciados por la comisión de alguna de las infracciones'),
('C031-0068','juiciamiento Criminal, deberá:','
a) Describir con precisión, en el boletín de denuncia o en el atestado, el procedimiento seguido, haciendo constar los datos de identificación del instrumento de detección empleado y detallando sus características genéricas.
b) Consignar las advertencias hechas al interesado, especialmente la del derecho a contrastar los resultados, y acreditar en las diligencias las pruebas o análisis practicados'),
('C031-0105','dad de ningún usuario, podrán:','
- dar media vuelta o marcha atrás;
- circular en sentido contrario al correspondiente a la calzada, SIEMPRE QUE LO HAGAN POR EL ARCÉN;
- penetrar en la mediana o en los pasos transversales de ésta.'),
('C031-0106','PRE QUE LO HAGAN POR EL ARCÉN;','
- penetrar en la mediana o en los pasos transversales de ésta.'),
('C031-0164','enor o igual a 3.500 kg: 7 cm;','
- vehículos con MMA mayor de 3.500 kg: 10 cm.'),
('C031-0173','risión de tres a seis meses, o','
- multa de seis a doce meses, o
- trabajos en beneficio de la comunidad de treinta y uno a noventa días;
y, en cualquier caso, con privación del derecho a conducir por tiempo superior a uno y hasta cuatro años.'),
('C031-0174','multa de seis a doce meses, o','
- trabajos en beneficio de la comunidad de treinta y uno a noventa días;
y, en cualquier caso, con privación del derecho a conducir por tiempo superior a uno y hasta cuatro años.'),
('C031-0175',' treinta y uno a noventa días;','
y, en cualquier caso, con privación del derecho a conducir por tiempo superior a uno y hasta cuatro años.'),
('C031-0239','orte de mercancías peligrosas;','
- SERVICIO DE URGENCIA;
- transportes especiales.'),
('C031-0240','PRE QUE LO HAGAN POR EL ARCÉN;','
- penetrar en la mediana o en los pasos transversales de ésta.'),
('C032-0009','cias ASISTENCIALES de clase B:',' al menos un conductor en posesión del título de formación profesional de técnico en emergencias sanitarias (RD 1397/2007) o título extranjero homologado, y otro en funciones de ayudante con, como mínimo, la misma titulación.'),
('C032-0010','ISTENCIALES de clases A1 y A2:',' al menos un conductor con, como mínimo, el certificado de profesionalidad de transporte sanitario previsto en el RD 710/2011, y cuando el tipo de servicio lo requiera, otro en funciones de ayudante con la misma cualificación.'),
('C033-0001','OS TIPOS según el combustible:','
- DE EXPLOSIÓN O GASOLINA.
- DE COMBUSTIÓN INTERNA DIÉSEL.'),
('C033-0027','sufrido variaciones radicales:','
- Bloque de motor.
- Cilindros.
- Pistones.
- Bielas.
- Cigüeñal.
- Culata donde se alojan las válvulas de admisión y escape.
- Colector para la admisión y otro para el escape.
- Sistema de alimentación de combustible.
- Sistema de encendido.
- Sistema de arranque.'),
('C033-0032','sufrido variaciones radicales:','
- Bloque de motor.
- Cilindros.
- Pistones.
- Bielas.
- Cigüeñal.
- Culata donde se alojan las válvulas de admisión y escape.
- Colector para la admisión y otro para el escape.
- Sistema de alimentación de combustible.
- Sistema de encendido.
- Sistema de arranque.'),
('C033-0047','a de alimentación de gasolina:','
- Tanque o depósito de combustible.
- Filtro o vaso de sedimentación.
- Bomba de alimentación.
- Carburador.
- Inyector.
- Líneas de combustible.'),
('C033-0165','sposición de los cilindros en:','
- Motores con CILINDROS EN LÍNEA.
- Motor con CILINDROS HORIZONTALES OPUESTOS.
- Motores con CILINDROS EN V.'),
('C033-0263','anol en altas concentraciones:','
1) Es CORROSIVO en contacto con ciertos materiales: compuestos de GOMA y aleaciones de ZINC Y ALUMINIO de carburadores y sistemas de inyección.
2) Como alcohol, SECA LOS COMPONENTES DE GOMA: agrietamiento y fragilidad de conductos, flotadores, sellos y diafragmas.
3) Es HIGROSCÓPICO — le gusta el agua: el agua condensada corre hacia el combustible y causa CORROSIÓN interna.
4) Actúa como DISOLVENT'),
('C033-0351','El circuito se divide en dos:','
- CIRCUITO DE BAJA PRESIÓN: depósito de carburante y bomba de alimentación.
- CIRCUITO DE ALTA PRESIÓN: el carburante circula a gran presión para VENCER LA RESISTENCIA DEL MUELLE DEL INYECTOR; la presión se eleva en la BOMBA DE INYECCIÓN.'),
('C033-0356','de alimentación deben cumplir:','
- Aporte de la DOSIS EXACTA de carburante a cada inyector EN FUNCIÓN DEL NÚMERO DE REVOLUCIONES.
- DISTRIBUCIÓN DE UNA MISMA CANTIDAD a cada cilindro, en un tiempo reducido y en el momento adecuado.'),
('C033-0381','ES INCOMBUSTIBLE como líquido:',' para quemarse debe VAPORIZARSE y mezclarse con aire DENTRO DE SU RANGO INFLAMABLE (ENTRE 5 Y 15%).'),
('C033-0394','la disposición de los motores:','
1. HÍBRIDO PARALELO: el TÉRMICO como fuente principal; el eléctrico aporta potencia en ARRANCADAS EN VACÍO Y ACELERACIONES.
2. HÍBRIDO COMBINADO: los dos motores funcionan combinados; el eléctrico a VELOCIDADES BAJAS, el térmico a ALTAS, reutilizando la energía del térmico para RECARGAR la batería.
3. HÍBRIDO EN SERIE: impulsado SOLO POR EL MOTOR ELÉCTRICO; en momentos puntuales un GENERADOR alimentado por un motor…'),
('C033-0395','ndo las baterías se descargan;',' ese motor es MUY PEQUEÑO y carga las baterías A UN RITMO MENOR DEL QUE SE DESCARGAN.'),
('C034-0025',' las baterías de alta tensión:',' FUSIBLES Y RELÉS que actúan en caso de CORTOCIRCUITO, FUERTE IMPACTO, DESCONEXIÓN DE LA BATERÍA AUXILIAR o AL APAGAR EL ENCENDIDO.'),
('C034-0032','sidad máxima habitual de 10 A.','
- CONECTOR TIPO 1 (SAE J1772): ESTÁNDAR JAPONÉS para recarga en CORRIENTE ALTERNA (adoptado por los americanos y aceptado en la UE).'),
('C034-0041','con intensidad de HASTA 125 A.','
- CONECTOR CCS (COMBO, IEC-62196-3): la versión adoptada EN EUROPA PARA CARGA EN CONTINUA.'),
('C035-0023',' seca; DEA; mando cabestrante;',' maletín línea de aire y pulmos; cinta de balizar y americana; nipones; griferías bibotella.'),
('C035-0025',' ascensores y de columna seca;',' DEA; mando cabestrante; maletín línea de aire y pulmos; cinta de balizar y americana; nipones; griferías bibotella.'),
('C035-0026','al y taladro, ambos a batería;',' sacos de cadáveres y trajes antisalpicaduras; cuerdas y mosquetones.'),
('C035-0028','res y trajes antisalpicaduras;',' cuerdas y mosquetones.'),
('C035-0030','lla, hacha); cortina antihumo;',' escalera telescópica; conos; útiles para electricidad; foco led con trípode; abrepuertas de batería; caja de llaves de ascensor; eslinga y perrillos.'),
('C035-0032','; escalera telescópica; conos;',' útiles para electricidad; foco led con trípode; abrepuertas de batería; caja de llaves de ascensor; eslinga y perrillos.'),
('C035-0033','ípode; abrepuertas de batería;',' caja de llaves de ascensor; eslinga y perrillos.'),
('C035-0036','llas de aire; EQUIPOS ERA (2);',' extintores; manguera en plegado americano; saca de incendio de piso (lanza, manguera y cordino).'),
('C035-0039','as de aseguramiento en altura;',' botellas de aire; EQUIPOS ERA (3); extintores.'),
('C035-0042','alcachofa); llave de hidrante;',' manguera corta de 70 mm; trifurcación.'),
('C035-0046','ERO…); mangotes de aspiración;',' GATO DEL VEHÍCULO.'),
('C035-0047','acorar; MANDO DEL FOCO MÁSTIL;',' manguera corta de 25 mm con bifurcación.'),
('C035-0048','aletín línea de aire y pulmos;',' cinta de balizar y americana; nipones; griferías bibotella.'),
('C035-0057','ERRA Y SUS ÚTILES; TURBOBOMBA;',' mangotes de aspiración; BATEFUEGOS; válvula de pie (alcachofa); herramientas manuales (gancho remolachero, cizalla…); BOLSA AUTORESCATE.'),
('C035-0058','ON GANCHOS; rueda de repuesto;',' MOTOSIERRA Y SUS ÚTILES; TURBOBOMBA; mangotes de aspiración; BATEFUEGOS; válvula de pie (alcachofa); herramientas manuales (gancho remolachero, cizalla…); BOLSA AUTORESCATE.'),
('C035-0060','tes de aspiración; BATEFUEGOS;',' válvula de pie (alcachofa); herramientas manuales (gancho remolachero, cizalla…); BOLSA AUTORESCATE.'),
('C035-0062',' MANGUERAS; llaves de racorar;',' manguera corta de 25 mm con bifurcación; manguera corta de 70 mm.'),
('C035-0064','esto; MOTOSIERRA Y SUS ÚTILES;',' TURBOBOMBA; mangotes de aspiración; BATEFUEGOS; válvula de pie (alcachofa); herramientas manuales (gancho remolachero, cizalla…); BOLSA AUTORESCATE.'),
('C035-0066','s; alargadera eléctrica; foco;',' cinta de balizar; EQUIPO ERA.'),
('C035-0067','tes de aspiración; BATEFUEGOS;',' válvula de pie (alcachofa); herramientas manuales (gancho remolachero, cizalla…); BOLSA AUTORESCATE.'),
('C035-0071','guera corta de 70 mm; MONITOR;',' trifurcación; bifurcaciones y reducciones.'),
('C035-0072','Y HACHA; caja de herramientas;',' EQUIPOS ERA (2); botellas de aire.'),
('C035-0073','e; válvula de pie (alcachofa);',' foco; alargadera eléctrica; BARRETA Y HACHA; caja de herramientas; EQUIPOS ERA (2); botellas de aire.'),
('C035-0075','TECHO: BIDONES DE ESPUMÓGENO;',' mangotes; ESCALERA CORREDERA.'),
('C035-0078','); foco; alargadera eléctrica;',' BARRETA Y HACHA; caja de herramientas; EQUIPOS ERA (2); botellas de aire.'),
('C035-0079','guera corta de 70 mm; MONITOR;',' trifurcación; bifurcaciones y reducciones.'),
('C035-0082',' BIDÓN MEZCLA PARA MOTOSIERRA;',' equipos para espuma; extintores; generador eléctrico; RADIAL DE CABLE.'),
('C035-0091','ón; boca de riego; TURBOBOMBA;',' válvula de pie (alcachofa).'),
('C035-0093',' alargaderas eléctricas; foco;',' BIDÓN MEZCLA PARA MOTOSIERRA; equipos para espuma; extintores; generador eléctrico; RADIAL DE CABLE.'),
('C035-0110','manguera en plegado americano;',' saca de incendio de piso (lanza, manguera y cordino).'),
('C035-0112','alcachofa); llave de hidrante;',' manguera corta de 70 mm; trifurcación.'),
('C035-0113','ípode; abrepuertas de batería;',' caja de llaves de ascensor; eslinga y perrillos.'),
('C035-0119','cabestrante; cinta de balizar;',' mascarillas FFP2; sales minerales.'),
('C035-0120','de racorar; llave de hidrante;',' manguera corta de 25 mm con bifurcación.'),
('C035-0122','vula de pie (alcachofa); foco;',' alargadera eléctrica; BARRETA Y HACHA; caja de herramientas; EQUIPOS ERA (2); botellas de aire.'),
('C035-0123','ón; boca de riego; TURBOBOMBA;',' válvula de pie (alcachofa).'),
('C035-0124','tintores; generador eléctrico;',' RADIAL DE CABLE.'),
('C035-0125','; proporcionador; reducciones;',' bifurcaciones; trifurcación; llaves de hidrante.'),
('C035-0126','; escalera; rueda de repuesto;',' MONITOR.'),
('C036-0005','ervicio, ordenadas por altura:','
- E-7: 50 m
- E-11: 37 m
- E-14: 37 m
- E-9: 30 m
- E-10: 30 m
- E-15: 25 m
- E-12: 18 m'),
('C036-0015','TADOR DE VEHÍCULOS ELÉCTRICOS;',' plástico de protección de víctimas; botellas de aire; gato; llave de corte de gas; sacos de cadáveres; BOLSA DE BOMBERO RATÓN.'),
('C036-0016','ico de protección de víctimas;',' botellas de aire; gato; llave de corte de gas; sacos de cadáveres; BOLSA DE BOMBERO RATÓN.'),
('C036-0018',' mantas térmicas; mascarillas;',' EQUIPOS ERA (5); DESCONECTADOR DE VEHÍCULOS ELÉCTRICOS; plástico de protección de víctimas; botellas de aire; gato; llave de corte de gas; sacos de cadáveres; BOLSA DE BOMBERO RATÓN.'),
('C036-0019','s; bridas; guantes de nitrilo;',' caja de llaves de ascensor; collarines; mantas térmicas; mascarillas; EQUIPOS ERA (5); DESCONECTADOR DE VEHÍCULOS ELÉCTRICOS; plástico de protección de víctimas; botellas de aire; gato; llave de corte de gas; sacos de cadáveres; BOLSA DE BOMBERO RATÓN.'),
('C036-0020','; gato; llave de corte de gas;',' sacos de cadáveres; BOLSA DE BOMBERO RATÓN.'),
('C036-0021','ARADOR LUKAS, ambos a batería;',' bolsa de tratamiento de lunas; juego de cubrecantos; sacas de aseguramiento en altura; lágrima de protección; juego de cadenas.'),
('C036-0023','ROTECTOR DE AIRBAG DE VOLANTE;',' maletines azules con equipos neumáticos; CIZALLA LUKAS y SEPARADOR LUKAS, ambos a batería; bolsa de tratamiento de lunas; juego de cubrecantos; sacas de aseguramiento en altura; lágrima de protección; juego de cadenas.'),
('C036-0025','azules con equipos neumáticos;',' CIZALLA LUKAS y SEPARADOR LUKAS, ambos a batería; bolsa de tratamiento de lunas; juego de cubrecantos; sacas de aseguramiento en altura; lágrima de protección; juego de cadenas.'),
('C036-0026','COFRE 1: apoyo escalonado;',' ESTAMPIDORES LUKAS; extintor; mini cizalla.'),
('C036-0029','s neumáticos; placas de carga;',' trajes antisalpicaduras; radial grande a cable; radial y taladro a batería; sierra de sable a batería; garrafa de gasolina; taladro de impacto a batería; pistolete; cepillo; ESTABILIZADORES STAB-FAST; pértiga eléctrica telescópica; TABLA CORTA J.'),
('C036-0031','ía; sierra de sable a batería;',' garrafa de gasolina; taladro de impacto a batería; pistolete; cepillo; ESTABILIZADORES STAB-FAST; pértiga eléctrica telescópica; TABLA CORTA J.'),
('C036-0032','a batería; pistolete; cepillo;',' ESTABILIZADORES STAB-FAST; pértiga eléctrica telescópica; TABLA CORTA J.'),
('C036-0033','telescópica; CIZALLA AISLANTE;',' DETECTORES DE CORRIENTE; BANQUETA AISLANTE; caja con material eléctrico; generador eléctrico; PICA DE TOMA DE TIERRA; TOMAS DE TIERRA DE CATENARIA.'),
('C036-0035',' CORRIENTE; BANQUETA AISLANTE;',' caja con material eléctrico; generador eléctrico; PICA DE TOMA DE TIERRA; TOMAS DE TIERRA DE CATENARIA.'),
('C036-0037','caleras; PÉRTIGA DE CATENARIA;',' PLATAFORMA PARA ACCIDENTES DE CAMIONES; puntales; tablones.'),
('C036-0038','léctrico; generador eléctrico;',' PICA DE TOMA DE TIERRA; TOMAS DE TIERRA DE CATENARIA.'),
('C036-0039','salpicaduras; PASTA TAPAFUGAS;',' apoyos y cojines; calzos de estabilización de escalera; juegos de calzos de estabilización.'),
('C036-0040','; caja de herramientas; conos;',' llaves de hidrante y racorar; maleta con balizas de señalización; manguera corta de 70 mm.'),
('C036-0041','A TAPAFUGAS; apoyos y cojines;',' calzos de estabilización de escalera; juegos de calzos de estabilización.'),
('C036-0042','; bolsa de cuerdas de trabajo;',' trajes antisalpicaduras; PASTA TAPAFUGAS; apoyos y cojines; calzos de estabilización de escalera; juegos de calzos de estabilización.'),
('C036-0046','tintores; pía metálica; polea;',' TRÁCTELES con sus sirgas.'),
('C036-0048','amilla nido rígida; escaleras;',' PÉRTIGA DE CATENARIA; PLATAFORMA PARA ACCIDENTES DE CAMIONES; puntales; tablones.'),
('C036-0051','e lunas; juego de cubrecantos;',' sacas de aseguramiento en altura; lágrima de protección; juego de cadenas.'),
('C036-0052','; collarines; mantas térmicas;',' mascarillas; EQUIPOS ERA (5); DESCONECTADOR DE VEHÍCULOS ELÉCTRICOS; plástico de protección de víctimas; botellas de aire; gato; llave de corte de gas; sacos de cadáveres; BOLSA DE BOMBERO RATÓN.'),
('C036-0053',' cinta americana y de balizar;',' rachet rope; sobre de nipones; bridas; guantes de nitrilo; caja de llaves de ascensor; collarines; mantas térmicas; mascarillas; EQUIPOS ERA (5); DESCONECTADOR DE VEHÍCULOS ELÉCTRICOS; plástico de protección de víctimas; botellas de aire; gato; llave de corte de gas; sacos de cadáveres; BOLSA DE BOMBERO RATÓN.'),
('C036-0054',' de ventanas oscilo-batientes;',' cinta de balizar y americana; griferías bibotella; MEDIDOR LÁSER; caja de llaves de ascensor; AURICULARES DE INSONORIZACIÓN; botellas de aire; camilla plegable; extintor; LAZO PARA ANIMALES; llaves de columna seca; nipones; linternas; EQUIPOS ERA (5); sacos de cadáveres y trajes antisalpicaduras; cuerdas y mosquetones; sacas de aseguramiento en altura; cepillo.'),
('C036-0055',' cinta de balizar y americana;',' griferías bibotella; MEDIDOR LÁSER; caja de llaves de ascensor; AURICULARES DE INSONORIZACIÓN; botellas de aire; camilla plegable; extintor; LAZO PARA ANIMALES; llaves de columna seca; nipones; linternas; EQUIPOS ERA (5); sacos de cadáveres y trajes antisalpicaduras; cuerdas y mosquetones; sacas de aseguramiento en altura; cepillo.'),
('C036-0056','AURICULARES DE INSONORIZACIÓN;',' botellas de aire; camilla plegable; extintor; LAZO PARA ANIMALES; llaves de columna seca; nipones; linternas; EQUIPOS ERA (5); sacos de cadáveres y trajes antisalpicaduras; cuerdas y mosquetones; sacas de aseguramiento en altura; cepillo.'),
('C036-0057','s; linternas; EQUIPOS ERA (5);',' sacos de cadáveres y trajes antisalpicaduras; cuerdas y mosquetones; sacas de aseguramiento en altura; cepillo.'),
('C036-0058','MALES; llaves de columna seca;',' nipones; linternas; EQUIPOS ERA (5); sacos de cadáveres y trajes antisalpicaduras; cuerdas y mosquetones; sacas de aseguramiento en altura; cepillo.'),
('C036-0060','las de aire; camilla plegable;',' extintor; LAZO PARA ANIMALES; llaves de columna seca; nipones; linternas; EQUIPOS ERA (5); sacos de cadáveres y trajes antisalpicaduras; cuerdas y mosquetones; sacas de aseguramiento en altura; cepillo.'),
('C036-0062','es (cizalla, Halligan); lanza;',' reducciones; mangueras.'),
('C036-0063',' sus útiles; SERRUCHO DE PODA;',' bolsa de radial y taladro, a batería; caja de herramientas.'),
('C036-0064',' corriente; foco led; trípode;',' motosierra y sus útiles; SERRUCHO DE PODA; bolsa de radial y taladro, a batería; caja de herramientas.'),
('C036-0067','con maceta, paleta y picoleta;',' gato de vehículo; bolsa de arnés de camilla; cepillo; SOPORTE DESCENSOR DE CESTA.'),
('C036-0068','con maceta, paleta y picoleta;',' gato de vehículo; bolsa de arnés de camilla; cepillo; SOPORTE DESCENSOR DE CESTA.'),
('C036-0070',' y picoleta; gato de vehículo;',' bolsa de arnés de camilla; cepillo; SOPORTE DESCENSOR DE CESTA.'),
('C036-0071','LA NIDO PLEGABLE Y PLATAFORMA;',' escaleras; generador eléctrico con prolongador de escape; MONITOR; lanza y manguera corta en el cajón de la cesta.'),
('C036-0072','rolongador de escape; MONITOR;',' lanza y manguera corta en el cajón de la cesta.'),
('C036-0074','O: BICHERO; bidón de gasolina;',' CAMILLA NIDO PLEGABLE Y PLATAFORMA; escaleras; generador eléctrico con prolongador de escape; MONITOR; lanza y manguera corta en el cajón de la cesta.'),
('C036-0075','CABINA: ANEMÓMETRO;',' bolsa de apertura de ventanas oscilo-batientes; cinta de balizar y americana; griferías bibotella; MEDIDOR LÁSER; caja de llaves de ascensor; AURICULARES DE INSONORIZACIÓN; botellas de aire; camilla plegable; extintor; LAZO PARA ANIMALES; llaves de columna seca; nipones; linternas; EQUIPOS ERA (5); sacos de cadáveres y trajes antisalpicaduras; cuerdas y mosquetones; sacas de aseguramiento en altura; cepillo.'),
('C036-0076','extintor; LAZO PARA ANIMALES;',' llaves de columna seca; nipones; linternas; EQUIPOS ERA (5); sacos de cadáveres y trajes antisalpicaduras; cuerdas y mosquetones; sacas de aseguramiento en altura; cepillo.'),
('C036-0077',' sus útiles; SERRUCHO DE PODA;',' bolsa de radial y taladro, a batería; caja de herramientas.'),
('C036-0078','rolongador de escape; MONITOR;',' lanza y manguera corta en el cajón de la cesta.'),
('C036-0079',' de arnés de camilla; cepillo;',' SOPORTE DESCENSOR DE CESTA.'),
('C036-0083','TADOR DE VEHÍCULOS ELÉCTRICOS;',' plástico de protección de víctimas; botellas de aire; gato; llave de corte de gas; sacos de cadáveres; BOLSA DE BOMBERO RATÓN.'),
('C036-0084','TAS MANUALES ANTIDEFLAGRANTES;',' cojines neumáticos; placas de carga; trajes antisalpicaduras; radial grande a cable; radial y taladro a batería; sierra de sable a batería; garrafa de gasolina; taladro de impacto a batería; pistolete; cepillo; ESTABILIZADORES STAB-FAST; pértiga eléctrica telescópica; TABLA CORTA J.'),
('C036-0085','arga; trajes antisalpicaduras;',' radial grande a cable; radial y taladro a batería; sierra de sable a batería; garrafa de gasolina; taladro de impacto a batería; pistolete; cepillo; ESTABILIZADORES STAB-FAST; pértiga eléctrica telescópica; TABLA CORTA J.'),
('C036-0086',': eslingas; perrillos; sirgas;',' botellas de aire; extintores; pía metálica; polea; TRÁCTELES con sus sirgas.'),
('C036-0087',' llaves de hidrante y racorar;',' maleta con balizas de señalización; manguera corta de 70 mm.'),
('C036-0088','GABLE Y PLATAFORMA; escaleras;',' generador eléctrico con prolongador de escape; MONITOR; lanza y manguera corta en el cajón de la cesta.'),
('C036-0089',' de ventanas oscilo-batientes;',' cinta de balizar y americana; griferías bibotella; MEDIDOR LÁSER; caja de llaves de ascensor; AURICULARES DE INSONORIZACIÓN; botellas de aire; camilla plegable; extintor; LAZO PARA ANIMALES; llaves de columna seca; nipones; linternas; EQUIPOS ERA (5); sacos de cadáveres y trajes antisalpicaduras; cuerdas y mosquetones; sacas de aseguramiento en altura; cepillo.'),
('C036-0091','ARMARIO 4: calces de madera;',' cubo plegable con maceta, paleta y picoleta; gato de vehículo; bolsa de arnés de camilla; cepillo; SOPORTE DESCENSOR DE CESTA.'),
('C037-0150','· 0,063 · 0,14 · 0,5 | 0,4 · –','
(NA = no aplicable; – = no medido.)'),
('C037-0153',',5 · 0,031 · 0,23 · NA | – · –','
Polimetil metacrilato 2,1 · 0,01 · 0,022 · NA | 0,19 · 0,032
Madera (pino) 1,33 · 0,005 · 0,015 · NA | 0,14 · 0,0024
PVC 0,46 · 0,063 · 0,14 · 0,5 | 0,4 · –
(NA = no aplicable; – = no medido.)'),
('C037-0300','CUATRO MECANISMOS:','
— ENFRIAMIENTO: reducir la temperatura del COMBUSTIBLE o de las LLAMAS. Es el PRINCIPAL mecanismo de extinción.
— SOFOCACIÓN: impedir la MEZCLA entre combustible y comburente.
— ELIMINACIÓN DEL COMBUSTIBLE: SEPARAR el combustible del incendio.
— INHIBICIÓN QUÍMICA: INTERRUMPIR la reacción química necesaria para mantener el incendio.'),
('C037-0369','85 · 0,01 · 0,037 · NA | – · –','
Poliestireno 2,3 · 0,06 · 0,16 · NA | – · –
Nylon 2,06 · 0,038 · 0,075 · NA | – · –
Poliuretano flexible 1,5 · 0,031 · 0,23 · NA | – · –
Polimetil metacrilato 2,1 · 0,01 · 0,022 · NA | 0,19 · 0,032
Madera (pino) 1,33 · 0,005 · 0,015 · NA | 0,14 · 0,0024
PVC 0,46 · 0,063 · 0,14 · 0,5 | 0,4 · –
(NA ='),
('C037-0370','· 0,063 · 0,14 · 0,5 | 0,4 · –','
(NA = no aplicable; – = no medido.)'),
('C037-0410','ble que en la estequiométrica;',' en la zona superior del rango es el OXÍGENO el que determina la energía desprendida.'),
('C038-0005','ONÓXIDO DE CARBONO y CIANUROS;',' en menor grado CLORURO y FLUORURO DE HIDRÓGENO y ÓXIDOS DE NITRÓGENO.'),
('C038-0124','O y N₂ próximos a los ideales;',' infra-ventilado, sin llama y degradación térmica: MÁS CO, HOLLÍN e HIDROCARBUROS.'),
('C038-0168','ema; en kg/s o g/s, término m;',' por unidad de área en kg/(m²·s), término m''''.'),
('C038-0178','dida del grado de VOLATILIDAD;',' presión de equilibrio de un líquido o sólido a una temperatura dada.'),
('C038-0206','ombustión (más LENTA, MÁS CO);',' 4) difusión en el aire (extremadamente alta).'),
('C038-0210','e el O₂ de un recinto cerrado;',' lesión típica de víctimas SORPRENDIDAS DORMIDAS.'),
('C038-0211','LADO» o «RICO EN COMBUSTIBLE»;',' mezcla perfecta con combustión completa = mezcla «ESTEQUIOMÉTRICA».'),
('C038-0215','en kg/s o g/s, término m;',' por unidad de área en kg/(m²·s), término m''''.'),
('C038-0221','N (menos ventilación, MÁS CO);',' 3) velocidad de combustión (más LENTA, MÁS CO); 4) difusión en el aire (extremadamente alta).'),
('C039-0003','DEZ pero durante MENOS TIEMPO:',' incendios más rápidos y más peligrosos para las personas.'),
('C039-0006','ECTO VISIBLE de la combustión:',' el material puede AUTOINFLAMARSE por altas temperaturas o inflamarse por una FUENTE EXTERNA (cerilla, chispa).'),
('C039-0009','TO: alrededor de 300 a 400 °C;',' sin llama, mayor; la MADERA necesita 500 a 600 °C en superficie para que sus vapores se AUTOINFLAMEN.')) as v(id, cola, ext)
  where b.id = v.id and right(b.cita, 30) = v.cola and (b.editada_at is null or b.id = 'C001-0021')
  returning 1)
select 'lote 4: ' || count(*) || ' de 160 citas ampliadas' as resultado from u;
