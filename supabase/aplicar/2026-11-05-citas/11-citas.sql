-- Lote 11: amplía la cita (texto literal que sigue en el bloque del corpus) de 160 preguntas.
-- Guardas: solo si la cita actual acaba exactamente como la que se amplió, y no está editada a mano.
with u as (
  update public.banco_preguntas b set cita = b.cita || v.ext, editada_at = now()
  from (values
('C081-0228','REDES EI 120. PUERTAS de paso:',' LA CUARTA PARTE de la resistencia al fuego exigible al elemento compartimentador que separa los recintos, y AL MENOS EI2 30-C5.'),
('C081-0262','adir la anchura libre de paso:',' RELLANOS de escaleras protegidas o especialmente protegidas, VESTÍBULOS DE INDEPENDENCIA de escaleras especialmente protegidas, o un PASILLO PROTEGIDO.'),
('C081-0280','ías con salidas de evacuación;',' pasarelas y escaleras del escenario de ANCHURA ≥ 0,80 M; parte superior con SISTEMA DE ELIMINACIÓN DE HUMO.'),
('C082-0001','E ZARAGOZA (PEMUZ) constituye:','
- EL MARCO ORGÁNICO-FUNCIONAL y los MECANISMOS DE MOVILIZACIÓN de los recursos adscritos al Ayuntamiento de Zaragoza, de sus entidades, y de aquellos recursos públicos y privados en la intervención ante emergencias de protección civil.
- Y FIJA LA COORDINACIÓN CON OTRAS ADMINISTRACIONES PÚBLICAS.'),
('C082-0008','estión bajo CUATRO PRINCIPIOS:',' MANDO ÚNICO, JERARQUÍA, INTEGRACIÓN Y COORDINACIÓN.'),
('C082-0020','etencias de DECISIÓN. Son dos:','
- EL DIRECTOR DEL PLAN, cuyo ámbito esencial se centra en DECISIONES DE NATURALEZA ESTRATÉGICA.
- EL DIRECTOR DE OPERACIONES (DO), cuyo ámbito se limita a DETERMINACIONES DE ORDEN TÉCNICO en la intervención sobre la emergencia.'),
('C082-0027','cciones a adoptar. Son cuatro:','
- EL COMITÉ ASESOR, integrado en el CECOPAZ.
- EL GABINETE DE PRENSA, integrado en el CECOPAZ.
- LA UNIDAD DE GESTIÓN ADMINISTRATIVA DE LA EMERGENCIA (UGAE), integrada en el CECOPAZ.
- EL COMITÉ DE APOYO, INTEGRADO EN EL PMA.'),
('C082-0054','CTOR DEL PLAN, QUE LO PRESIDE,',' para ejercer las funciones de MANDO Y CONTROL ante las emergencias.'),
('C082-0056','y lo integran CINCO ELEMENTOS:','
1. El Director del Plan.
2. El Director Técnico de la Emergencia.
3. El Comité Asesor.
4. El Gabinete de Información.
5. La Unidad de Gestión Administrativa de la Emergencia.'),
('C082-0058','lo integran CINCO ELEMENTOS:','
1. El Director del Plan.
2. El Director Técnico de la Emergencia.
3. El Comité Asesor.
4. El Gabinete de Información.
5. La Unidad de Gestión Administrativa de la Emergencia.'),
('C082-0060','SALVAMENTO Y PROTECCIÓN CIVIL,',' SITO EN CALLE VALLE DE BROTO N.º 16, de la ciudad de Zaragoza, salvo que el Director del Plan disponga otra ubicación.'),
('C082-0063','ciones propias de la alcaldía,',' PUDIENDO DELEGAR LA DIRECCIÓN DEL PLAN EN EL CONCEJAL CON COMPETENCIAS EN MATERIA DE PROTECCIÓN CIVIL.'),
('C082-0065',' recursos y medios necesarios;',' y garantizar el apoyo y la colaboración necesaria cuando se encuentre activado un plan de protección civil de ámbito superior al municipal.'),
('C082-0071',' de movilización y despliegue,',' y DESIGNANDO AL DIRECTOR DE OPERACIONES y la COMPOSICIÓN DE SU COMITÉ DE APOYO.'),
('C082-0085','SALVAMENTO Y PROTECCIÓN CIVIL;',' EN SU AUSENCIA, LA ASUMIRÁ EL MANDO CON MAYOR RANGO JERÁRQUICO.'),
('C082-0087','dos con la toma de decisiones,',' como en el traslado y materialización de las órdenes a cursar, DEPENDIENDO DIRECTAMENTE DE LA DIRECCIÓN DEL PLAN.'),
('C082-0089','en relación con la emergencia,',' su evolución, operaciones en marcha y demás circunstancias; también SUPERVISARÁ la efectiva ejecución de las instrucciones de la dirección del Plan, la correcta puesta en marcha de la estructura operativa del PEMUZ y el grado de cumplimiento de sus funciones.'),
('C082-0100','DAD/SOCORRO Y ZONA LIBRE/BASE,',' así como medidas de protección para las personas, bienes y medio ambiente.'),
('C082-0105','TA, EMERGENCIA O RECUPERACIÓN,',' y en lo referente a la operatividad del Plan.'),
('C082-0110','iente del Ayuntamiento (once):','
1. FIGURA POLÍTICA del Ayuntamiento con las competencias delegadas de protección civil.
2. Representante municipal del Servicio de Extinción, Salvamento y Protección Civil.
3. JEFE DE GABINETE DE INFORMACIÓN.
4. DIRECTOR TÉCNICO DE LA EMERGENCIA.
5. Representante municipal competente en materia de POLICÍA LOCAL.
6. Representante municipal competente en materia de ASISTENCIA SANITARIA.
7. Representante municipal…'),
('C082-0111','iente del Ayuntamiento (once):','
1. FIGURA POLÍTICA del Ayuntamiento con las competencias delegadas de protección civil.
2. Representante municipal del Servicio de Extinción, Salvamento y Protección Civil.
3. JEFE DE GABINETE DE INFORMACIÓN.
4. DIRECTOR TÉCNICO DE LA EMERGENCIA.
5. Representante municipal competente en materia de POLICÍA LOCAL.
6. Representante municipal competente en materia de ASISTENCIA SANITARIA.
7. Representante municipal…'),
('C082-0122','FUNCIONES (cuatro):','
1. EVALUAR Y DETERMINAR LAS CONSECUENCIAS de la emergencia.
2. Dar APOYO TÉCNICO PARA LA TOMA DE DECISIONES del Director del Plan.
3. Analizar la conveniencia de la posible adopción de MEDIDAS DE PROTECCIÓN A LA POBLACIÓN.
4. TRANSMITIR TODA LA INFORMACIÓN de la que dispongan sobre el estado de la emergencia, su evolución, las medidas adoptadas y sus efectos, así como de los medios y recursos prop'),
('C082-0127',' designe el Director del Plan;',' y EN SU AUSENCIA, la ostentará el RESPONSABLE DE LA UNIDAD TÉCNICA DE DIFUSIÓN DE PRENSA Y COMUNICACIÓN.'),
('C082-0132','TAMENTE DEL DIRECTOR DEL PLAN,',' constituyéndose a requerimiento de la dirección del Plan y bajo su mandato.'),
('C082-0135','FUNCIONES (siete):','
1. Recabar y recibir información sobre la emergencia y su evolución.
2. ELABORAR LOS COMUNICADOS destinados a su difusión en medios de comunicación, así como CENTRALIZAR, COORDINAR Y ORIENTAR la información para los medios de comunicación.
3. Informar a la población afectada por la emergencia.
4. Informar a instituciones, organismos y particulares sobre la emergencia.
5. Difundir a la población cu'),
('C082-0146','ntro del PMA, los CINCO JEFES:',' JEFE DE INTERVENCIÓN · JEFE DE SEGURIDAD · JEFE SANITARIO · JEFE DE ACCIÓN SOCIAL · JEFE DE LOGÍSTICA (recuadros punteados), cada uno con flecha desde el Director de Operaciones.'),
('C082-0148','fe baja una flecha a su grupo:',' GRUPO DE INTERVENCIÓN · GRUPO DE SEGURIDAD · GRUPO SANITARIO · GRUPO DE ACCIÓN SOCIAL · GRUPO LOGÍSTICO.'),
('C082-0152','A ACTIVACIÓN EXPRESA DEL PLAN,',' aplicando los procedimientos existentes para articular la respuesta, seguimiento y coordinación.'),
('C082-0155','e emergencias, 112 SOS-ARAGÓN,',' autoridades de protección civil pertinentes y cualquier organismo o institución que deba conocerla.'),
('C082-0157','rativa del GOBIERNO DE ARAGÓN;','
o la DELEGACIÓN DEL GOBIERNO EN ARAGÓN;
   o el CECOR (CENTROS DE COORDINACIÓN DE SEGURIDAD Y EMERGENCIAS);
   o otros centros de coordinación y seguimiento de la situación de emergencia.'),
('C082-0158','limítrofes que se establezcan;','
o el Centro de Coordinación Operativa del GOBIERNO DE ARAGÓN;
   o la DELEGACIÓN DEL GOBIERNO EN ARAGÓN;
   o el CECOR (CENTROS DE COORDINACIÓN DE SEGURIDAD Y EMERGENCIAS);
   o otros centros de coordinación y seguimiento de la situación de emergencia.'),
('C082-0159','GACIÓN DEL GOBIERNO EN ARAGÓN;','
o el CECOR (CENTROS DE COORDINACIÓN DE SEGURIDAD Y EMERGENCIAS);
   o otros centros de coordinación y seguimiento de la situación de emergencia.'),
('C082-0160','N DE SEGURIDAD Y EMERGENCIAS);','
o otros centros de coordinación y seguimiento de la situación de emergencia.'),
('C082-0170',' TÉCNICO, con estos cometidos:','
o trasladar las órdenes del Director del Plan al PMA;
   o facilitar la necesaria coordinación entre el Director de Operaciones y los Jefes de los Grupos de Acción;
   o gestionar la movilización de medios y recursos;
   o otras funciones de gestión que se consideren necesarias por la Dirección del Plan.'),
('C082-0171',' del Director del Plan al PMA;','
o facilitar la necesaria coordinación entre el Director de Operaciones y los Jefes de los Grupos de Acción;
   o gestionar la movilización de medios y recursos;
   o otras funciones de gestión que se consideren necesarias por la Dirección del Plan.'),
('C082-0172','Jefes de los Grupos de Acción;','
o gestionar la movilización de medios y recursos;
   o otras funciones de gestión que se consideren necesarias por la Dirección del Plan.'),
('C082-0174','lización de medios y recursos;','
o otras funciones de gestión que se consideren necesarias por la Dirección del Plan.'),
('C082-0176','ntemente informado al CECOPAZ;',' y solicitar medios, recursos y capacidades necesarios.'),
('C082-0177','nto continuo de la emergencia,',' COORDINANDO LAS ACTUACIONES DE LOS GRUPOS DE ACCIÓN; ESTABLECER LA ZONIFICACIÓN de la emergencia; mantener permanentemente informado al CECOPAZ; y solicitar medios, recursos y capacidades necesarios.'),
('C082-0184',' EN UNA DEPENDENCIA MUNICIPAL,',' para alcanzar la integración y coordinación de los múltiples PMA que deberían constituirse.'),
('C082-0187','FUNCIONES, siete:','
1. Efectuar una VALORACIÓN PERMANENTE de la situación y transmitirla a la Dirección del Plan.
2. DEFINIR LA ESTRATEGIA DE ACTUACIÓN ante la emergencia.
3. Solicitar la activación de medios, recursos y capacidades necesarios.
4. COORDINAR LAS INTERVENCIONES DE LOS GRUPOS DE ACCIÓN.
5. PROPONER CAMBIOS DE FASE Y DE NIVEL del PEMUZ.
6. Transmitir órdenes de DESMOVILIZACIÓN a los medios y recursos act'),
('C082-0195',' DEL PUESTO DE MANDO AVANZADO,',' gestionando y coordinando todos los medios asignados a la emergencia, SI BIEN ESTOS MANTENDRÁN EL MANDO NATURAL SOBRE SUS EFECTIVOS y velarán por su seguridad.'),
('C082-0199','CTOR TÉCNICO DE LA EMERGENCIA,',' y DESARROLLARÁ SUS COMETIDOS EN LA UBICACIÓN DEL PUESTO DE MANDO AVANZADO.'),
('C082-0211','N EL CECOPAZ A TRAVÉS DEL DTE,',' informando de la evolución y de la necesidad de nuevos medios, recursos o capacidades.'),
('C082-0219','más adecuadas como pueden ser:','
19. Recabar información sobre la evolución de las causas de la emergencia y de los elementos vulnerables.
20. Elaboración de CARTOGRAFÍA de la emergencia.
21. Difusión de recomendaciones de autoprotección a la población.
22. Valoraciones técnicas de especialistas, simulaciones y predicciones.
23. Establecer un REGISTRO CRONOLÓGICO del desarrollo de los acontecimientos.
24. PROPONER LA DESACTIVACIÓ'),
('C082-0232','FUNCIONES (siete):','
1. Dar ASISTENCIA Y SOPORTE TÉCNICO AL DIRECTOR DE OPERACIONES en recopilación de información, gestión de medios y recursos, seguimiento de víctimas y damnificados, etc.
2. Analizar y estudiar las diferentes ESTRATEGIAS para afrontar la emergencia.
3. Evaluar y analizar la situación.
4. Recomendar medidas y actuaciones a desarrollar.
5. Informar sobre la posible evolución de la emergencia.
6. Anal'),
('C082-0241',' las acciones de intervención,',' teniendo como misión trasladar a los miembros de su Grupo LOS OBJETIVOS de la intervención, LA ORDENACIÓN DE LAS ACTUACIONES y LA ORGANIZACIÓN INTERNA, estando sus acciones COORDINADAS CON EL DIRECTOR DE OPERACIONES.'),
('C082-0242','NES y LA ORGANIZACIÓN INTERNA,',' estando sus acciones COORDINADAS CON EL DIRECTOR DE OPERACIONES.'),
('C082-0244','A DEL DIRECTOR DE OPERACIONES;',' EN AUSENCIA DE LA DESIGNACIÓN FORMAL, corresponde la Jefatura:
- GRUPO DE INTERVENCIÓN: al BOMBERO DE MAYOR RANGO EN LA ZONA DE INTERVENCIÓN.'),
('C082-0264','CCIONES PREVISTAS en el PEMUZ,',' a través de las cuales se organiza la intervención y acción efectiva en situaciones de emergencia.'),
('C082-0266','los JEFES DEL GRUPO DE ACCIÓN,',' coordinadas por el DIRECTOR DE OPERACIONES y siempre supeditadas a LA DIRECCIÓN DEL PLAN.'),
('C082-0268','RAS ADMINISTRACIONES PÚBLICAS,',' así como LOS DEPENDIENTES DE OTRAS ENTIDADES PÚBLICAS O PRIVADAS que participen en la organización de la intervención directa en la emergencia.'),
('C082-0271','IÓN DE CINCO GRUPOS DE ACCIÓN:','
1. INTERVENCIÓN.
2. SEGURIDAD.
3. SANITARIO.
4. ACCIÓN SOCIAL.
5. LOGÍSTICA.'),
('C082-0272','IÓN DE CINCO GRUPOS DE ACCIÓN:','
1. INTERVENCIÓN.
2. SEGURIDAD.
3. SANITARIO.
4. ACCIÓN SOCIAL.
5. LOGÍSTICA.'),
('C082-0275','SOBRE LA CAUSA que la produce,',' controlando y valorando su evolución y propagación, así como las dirigidas al SALVAMENTO, RESCATE, PROTECCIÓN Y ASEGURAMIENTO de las personas y bienes afectados.'),
('C082-0277','do su evolución y propagación,',' así como las dirigidas al SALVAMENTO, RESCATE, PROTECCIÓN Y ASEGURAMIENTO de las personas y bienes afectados.'),
('C082-0296','la extracción de las víctimas,',' así como transferir en condiciones de seguridad las víctimas rescatadas.'),
('C082-0302','s al Ayuntamiento de Zaragoza,',' de sus entidades, y de aquellos recursos públicos y privados en la intervención ante emergencias de protección civil.'),
('C082-0303','etencias de DECISIÓN. Son dos:','
- EL DIRECTOR DEL PLAN, cuyo ámbito esencial se centra en DECISIONES DE NATURALEZA ESTRATÉGICA.
- EL DIRECTOR DE OPERACIONES (DO), cuyo ámbito se limita a DETERMINACIONES DE ORDEN TÉCNICO en la intervención sobre la emergencia.'),
('C082-0307','ntro del PMA, los CINCO JEFES:',' JEFE DE INTERVENCIÓN · JEFE DE SEGURIDAD · JEFE SANITARIO · JEFE DE ACCIÓN SOCIAL · JEFE DE LOGÍSTICA (recuadros punteados), cada uno con flecha desde el Director de Operaciones.'),
('C082-0308','CTOR DEL PLAN, QUE LO PRESIDE,',' para ejercer las funciones de MANDO Y CONTROL ante las emergencias.'),
('C082-0312','TAMENTE DEL DIRECTOR DEL PLAN,',' y SE CONSTITUYE POR REQUERIMIENTO DE LA DIRECCIÓN DEL PLAN Y BAJO SU PRESIDENCIA.'),
('C082-0314','ORA Y GESTIONA LA INFORMACIÓN,',' DEPENDIENDO DIRECTAMENTE DEL DIRECTOR DEL PLAN, constituyéndose a requerimiento de la dirección del Plan y bajo su mandato.'),
('C082-0319','n su caso, entre el CECOPAZ y:','
o el Centro de Coordinación Operativa de la COMARCA CENTRAL y de otras comarcas limítrofes que se establezcan;
   o el Centro de Coordinación Operativa del GOBIERNO DE ARAGÓN;
   o la DELEGACIÓN DEL GOBIERNO EN ARAGÓN;
   o el CECOR (CENTROS DE COORDINACIÓN DE SEGURIDAD Y EMERGENCIAS);
   o otros centros de coordinación y seguimiento de la situación de emergencia.'),
('C082-0320','EL DIRECTOR DEL PLAN Y EL PMA,',' A TRAVÉS DEL DIRECTOR TÉCNICO, con estos cometidos:
   o trasladar las órdenes del Director del Plan al PMA;
   o facilitar la necesaria coordinación entre el Director de Operaciones y los Jefes de los Grupos de Acción;
   o gestionar la movilización de medios y recursos;
   o otras funciones de gestión que se consideren necesarias por la Dirección del Plan.'),
('C082-0321','e coordinación de emergencias,',' 112 SOS-ARAGÓN, autoridades de protección civil pertinentes y cualquier organismo o institución que deba conocerla.'),
('C082-0326','responde AL DIRECTOR DEL PLAN,',' quien, en función de la naturaleza de la emergencia, OPTARÁ POR LOS FUNCIONARIOS MUNICIPALES DE PERFIL TÉCNICO EN EMERGENCIAS.'),
('C082-0330','a la gestión de la emergencia,',' PRÁCTICOS DEL TERRENO y RESPONSABLES DE LAS INSTALACIONES U ORGANISMOS directamente afectados.'),
('C082-0336','IÓN DE CINCO GRUPOS DE ACCIÓN:','
1. INTERVENCIÓN.
2. SEGURIDAD.
3. SANITARIO.
4. ACCIÓN SOCIAL.
5. LOGÍSTICA.'),
('C082-0340','CCIÓN, ASUMIDA POR ESTE ORDEN:','
1. INSPECTOR JEFE DEL SCIS Y PC.
2. SUBINSPECTOR JEFE DEL SCIS Y PC.
3. JEFE DE MANDO.'),
('C082-0344','CTOR DEL PLAN, QUE LO PRESIDE,',' para ejercer las funciones de MANDO Y CONTROL ante las emergencias.'),
('C082-0362','responde AL DIRECTOR DEL PLAN,',' PUDIENDO ESTAR PROPUESTOS POR EL DIRECTOR TÉCNICO DE LA EMERGENCIA Y EL DIRECTOR DE OPERACIONES.'),
('C082-0363','undir a la población afectada,',' y las medidas preventivas que deben adoptar.'),
('C082-0365','a gestión ante una emergencia;',' velar por la eficiencia de las medidas adoptadas; promover los recursos y medios necesarios; y garantizar el apoyo y la colaboración necesaria cuando se encuentre activado un plan de protección civil de ámbito superior al municipal.'),
('C083-0066','idas), ASUMIDA POR ESTE ORDEN:','
1. SUPERINTENDENTE JEFE DE POLICÍA LOCAL.
2. INTENDENTE PRINCIPAL DE SEMANA (O DE GUARDIA).
3. JEFE DE SERVICIO EN EL TURNO.
Hasta hacerse cargo uno de los citados, el mando lo ejercerá aquel MIEMBRO DE LAS FCS EN EL LUGAR DE LOS HECHOS que, atendiendo a las competencias atribuidas, POR MAYOR RANGO corresponda.'),
('C083-0076','NAMENTALES con fines sociales:',' CRUZ ROJA, CÁRITAS, fundaciones de atención a personas vulnerables socialmente, etc.
- COLEGIOS DE EDUCADORES, PSICÓLOGOS, ASISTENTES SOCIALES, etc.
- COLECTIVOS DE VOLUNTARIADO SOCIAL.'),
('C083-0080',' zona de la emergencia; doce):','
1. Identificar, valorar y determinar las NECESIDADES DE ATENCIÓN PSICOLÓGICA Y SOCIAL de las personas afectadas, en función de su VULNERABILIDAD.
2. Gestionar la atención social y psicológica de la población afectada.
3. Organizar y supervisar el TRASLADO A LOS CENTROS DE ACOGIDA.
4. Evaluar, cuantificar y prever los CENTROS DE REALOJAMIENTO necesarios.
5. Atender el AUXILIO DE MANUTENCIÓN a la po'),
('C083-0105','FUNCIONES (catorce):','
1. Obtener, acopiar, transportar y suministrar a los distintos Grupos el MATERIAL Y EQUIPOS BÁSICOS.
2. Gestionar y suministrar la maquinaria y equipamiento técnico para la rehabilitación y reposición de servicios.
3. Resolver los problemas de ABASTECIMIENTO, CARBURANTE Y TRANSPORTE de los Grupos de Acción.
4. Prever y proporcionar el ALOJAMIENTO DE LOS COLECTIVOS PARTICIPANTES en la emergencia.
5'),
('C083-0156','IVAR LA FASE DE ALERTA, cinco:','
1. Las PREVISIONES DESFAVORABLES respecto a la evolución de una o varias situaciones de riesgo.
2. La información sobre la evolución de UNA EMERGENCIA ORDINARIA SUSCEPTIBLE DE GENERAR UNA EMERGENCIA DE PROTECCIÓN CIVIL.
3. LA ACTIVACIÓN DE UN PLAN DE AUTOPROTECCIÓN en emergencia.
4. UNA REDUCCIÓN SIGNIFICATIVA DE LA CAPACIDAD DE RESPUESTA de los medios y recursos adscritos al Plan.
5. LA ACTIVACIÓ'),
('C083-0167',' LA FASE DE EMERGENCIA, cinco:','
1. La EVOLUCIÓN DESFAVORABLE DE UNA SITUACIÓN QUE HA MOTIVADO LA DECLARACIÓN DE LA FASE DE ALERTA.
2. La evolución desfavorable de una emergencia EN UN ESTABLECIMIENTO AFECTADO POR LA NORMA BÁSICA DE AUTOPROTECCIÓN.
3. La existencia de un RIESGO COLECTIVO CON PELIGRO PARA PERSONAS Y BIENES.
4. La MAGNITUD DE LAS CONSECUENCIAS reales y previsibles.
5. La CANTIDAD Y TIPO DE MEDIOS Y RECURSOS NECESARIOS.'),
('C083-0190','DIRECTOR DEL PEMUZ (siete):','
- Declarar formalmente las fases de alerta y, en su caso, la activación del PEMUZ.
- DETERMINAR LA DELEGACIÓN DE LA DIRECCIÓN DEL PLAN en la fase de alerta.
- CONSTITUIR EL CECOPAZ MEDIANTE LA CONVOCATORIA DEL GABINETE DE INFORMACIÓN Y DEL COMITÉ ASESOR, determinando quiénes los componen.
- Establecer las autoridades, entidades y organismos a los que comunicar la activación de la alerta.
- Determinar los servicios,…'),
('C083-0197','ICO DE LA EMERGENCIA (cuatro):','
- Supervisar y coordinar el seguimiento; recopilar, analizar y valorar las informaciones y trasladarlas al Director del Plan PERIÓDICAMENTE Y SIEMPRE QUE EXISTA UN CAMBIO RELEVANTE.
- Supervisar y verificar la ejecución de las comunicaciones de activación y de la declaración de alerta.
- Coordinar la activación de los elementos, medios y recursos del PEMUZ para las acciones ordenadas.
- Asesorar al Director del…'),
('C083-0203','BINETE DE INFORMACIÓN (cinco):','
- Recopilar informaciones de MEDIOS DE COMUNICACIÓN Y REDES SOCIALES.
- Elaborar los comunicados y notas de prensa.
- Elaborar los avisos y recomendaciones a la población.
- Coordinar la difusión de avisos, recomendaciones, comunicados y notas de prensa.
- Convocar y organizar RUEDAS DE PRENSA y comparecencias de autoridades municipales.'),
('C083-0208','GESTIÓN ADMINISTRATIVA (ocho):','
- FORMALIZAR ADMINISTRATIVAMENTE LA ACTIVACIÓN DEL PEMUZ.
- Mantener la comunicación con los servicios involucrados y fuentes de información.
- Recopilar y organizar informaciones de Administraciones y medios de emergencia (previsiones, predicciones, sucesos e incidentes).
- Recabar datos sobre antecedentes de riesgos, elementos vulnerables y daños previsibles.
- Informar periódicamente al DTE y d'),
('C083-0218','es acciones generales (siete):','
- CONSTITUCIÓN DEL CECOPAZ, si no está ya constituido, convocando a todos los órganos que lo integran.
- INFORMAR DE LA ACTIVACIÓN, de la declaración de fase y nivel, y de los motivos, A LOS RESPONSABLES DE PROTECCIÓN CIVIL DE LOS MUNICIPIOS LIMÍTROFES QUE PUEDAN ESTAR AFECTADOS, DE LA COMARCA CENTRAL Y DEL GOBIERNO DE ARAGÓN.
- DESIGNACIÓN DE LOS RESPONSABLES de los órganos de la estructura del P'),
('C083-0228','DIRECTOR DEL PEMUZ (quince):','
- DECLARAR FORMALMENTE EL NIVEL 1 de la fase de emergencia.
- Informar de la situación a las autoridades de protección civil de los MUNICIPIOS AFECTADOS, de la COMARCA CENTRAL y del GOBIERNO DE ARAGÓN.
- Designar a las personas que han de formar parte del Comité Asesor.
- CONVOCAR AL COMITÉ ASESOR.
- CONSTITUIR EL GABINETE DE INFORMACIÓN.
- DELEGAR las funciones de dirección del PEMUZ cuando se prevea su…'),
('C083-0243','COMITÉ ASESOR (seis):','
- Constituirse en la fecha, hora y lugar que establezca la convocatoria.
- Recopilar y recabar información de su ámbito profesional sobre el riesgo causante, la emergencia y sus efectos presentes y posibles.
- Evaluar y prever la situación.
- Informar al Director del Plan.
- Atender a las demandas de información del Director del Plan del ámbito propio de cada integrante.
- ASESORAR al Director del Plan sobre…'),
('C083-0278','idas), ASUMIDA POR ESTE ORDEN:','
1. SUPERINTENDENTE JEFE DE POLICÍA LOCAL.
2. INTENDENTE PRINCIPAL DE SEMANA (O DE GUARDIA).
3. JEFE DE SERVICIO EN EL TURNO.
Hasta hacerse cargo uno de los citados, el mando lo ejercerá aquel MIEMBRO DE LAS FCS EN EL LUGAR DE LOS HECHOS que, atendiendo a las competencias atribuidas, POR MAYOR RANGO corresponda.'),
('C083-0279',' lo integran fundamentalmente:','
- La POLICÍA LOCAL del Ayuntamiento de Zaragoza.
- Los AGENTES MEDIOAMBIENTALES del Ayuntamiento de Zaragoza.
- Medios municipales que, por la normativa aplicable, puedan realizar funciones complementarias y de apoyo en materia de control de accesos y tráfico.
- Entidades u organismos públicos o privados con capacidad de aportar medios propios del Grupo, movilizados mediante la operatividad del PEMUZ.
- EMPRESAS DE…'),
('C083-0294','DEL PEMUZ, una regla por fase:','
- DE LA FASE DE ALERTA: cuando la información actualizada indique que NO EXISTE UN RIESGO SIGNIFICATIVO sobre la población y bienes.
- DE LAS FASES DE EMERGENCIA: cuando HAYAN CESADO LAS CAUSAS que han provocado la situación de emergencia extraordinaria.
- DE LA FASE DE NORMALIZACIÓN: cuando se encuentre ASEGURADO EL RESTABLECIMIENTO DE LOS SERVICIOS ESENCIALES de los colectivos y zonas afectadas.'),
('C083-0295','N DE LA FASE DE NORMALIZACIÓN:',' se declarará UNA VEZ FINALIZADA LA FASE DE EMERGENCIA y sea preciso realizar acciones para el RESTABLECIMIENTO DE LAS CONDICIONES MÍNIMAS PARA LA VUELTA A LA NORMALIDAD de los colectivos y zonas afectadas.'),
('C083-0296','- DE LAS FASES DE EMERGENCIA:',' cuando HAYAN CESADO LAS CAUSAS que han provocado la situación de emergencia extraordinaria.'),
('C083-0297','CAL ANTE UN RIESGO ESPECÍFICO:',' EL PEMUZ SE ACTIVARÁ AUTOMÁTICAMENTE cuando se dé alguna de las situaciones previstas en los Planes de Actuación Municipales ante riesgos específicos.'),
('C083-0298','- DE LA FASE DE NORMALIZACIÓN:',' cuando se encuentre ASEGURADO EL RESTABLECIMIENTO DE LOS SERVICIOS ESENCIALES de los colectivos y zonas afectadas.'),
('C083-0300','ar y coordinar el seguimiento;',' recopilar, analizar y valorar las informaciones y trasladarlas al Director del Plan PERIÓDICAMENTE Y SIEMPRE QUE EXISTA UN CAMBIO RELEVANTE.'),
('C083-0303','DAD DEL MOMENTO DE CONVOCARLO;',' avisos y recomendaciones a la población; instituciones y organismos a los que comunicar la declaración de alerta.'),
('C083-0304','sorar al Director del Plan en:',' COMPOSICIÓN DEL COMITÉ ASESOR; IDONEIDAD DEL MOMENTO DE CONVOCARLO; avisos y recomendaciones a la población; instituciones y organismos a los que comunicar la declaración de alerta.'),
('C083-0311','AR al Director del Plan sobre:',' medios y recursos movilizados; previsión de la capacidad de intervención de los Grupos de Acción; información de personas y bienes afectados; estimación de la evolución según las medidas adoptadas y los escenarios previsibles; acciones de gestión del plan realizadas (convocatoria, comunicaciones a otras administraciones, peticiones de información, etc.).'),
('C083-0312','ECLARACIÓN DE FASES Y NIVELES;',' LA DESACTIVACIÓN DEL PEMUZ; las acciones concretas a realizar; los medios y recursos necesarios.'),
('C083-0314','DINAR EN EL MARCO DEL CECOPAZ:',' las tareas de la UGA; la protección de PERSONAS AJENAS A LOS GRUPOS DE ACCIÓN, en comunicación con el DO; las actuaciones de otros organismos e instituciones; la activación de los medios que se le encomienden; el seguimiento de los medios de los Grupos de Acción; LA TRANSMISIÓN DE INFORMACIÓN ENTRE EL CECOPAZ Y EL/LOS PMA; la ACTIVACIÓN Y DESARROLLO DE LOS PLANES ANTE RIESGOS ESPECÍFICOS; la comunicación de la…'),
('C084-0027','RECTOR DE OPERACIONES (cinco):','
- Incorporarse al PMA, SI LO REQUIERE EL DO.
- Asegurar el canal de comunicación con el DO.
- Aportar la información de que disponga.
- Prestar asesoramiento en la gestión de la intervención operativa.
- Desarrollar las funciones que le encomiende el DO.'),
('C084-0028','FES DE GRUPO DE ACCIÓN (seis):','
- INCORPORARSE AL PMA A REQUERIMIENTO DEL DO.
- Asegurar el canal de comunicación con el DO y con los miembros de su Grupo.
- Planificar y organizar la ejecución de las acciones técnicas encomendadas por el DO.
- Mantener la vigilancia de la causa de la emergencia y de sus efectos en su ámbito.
- Informar al DO de los aspectos relevantes y la consecución de los objetivos.
- Velar por la seguridad'),
('C084-0062','egulación y cortes de tráfico;',' cortes de carreteras · LEVANTAMIENTO DE ATESTADOS en accidentes · seguridad ciudadana, PREVENCIÓN DE PILLAJES Y ROBOS en evacuaciones · IDENTIFICACIÓN DE CADÁVERES (NECROIDENTIFICACIÓN), si fuera necesario, realización de autopsias y recopilación de DATOS ANTE MORTEM en colaboración con la POLICÍA CIENTÍFICA y los MÉDICOS FORENSES · LEVANTAMIENTO DE CADÁVERES · apoyo al «Grupo de Rescate» · habilitación de ZONAS…'),
('C084-0107','DIRECTOR DEL PEMUZ (ocho):','
- SOLICITAR, MOTIVADAMENTE, LA ACTIVACIÓN DE UN PLAN DE ÁMBITO SUPERIOR.
- Declarar formalmente el nivel 2.
- Coordinar con el CECOP autonómico información, estrategias, objetivos, necesidades y acciones.
- Trasladar al CECOP autonómico las afectaciones y el grado de los daños.
- SEGUIR LAS DIRECTRICES DE LA DIRECCIÓN DEL PLAN AUTONÓMICO y atender las decisiones del CECOP.
- Desplegar la estructura del PEMUZ según…'),
('C084-0120',' DEL DIRECTOR DEL PLAN (seis):','
1. FORMALIZAR ADMINISTRATIVAMENTE la desactivación de la fase de emergencia, del PEMUZ en su caso, y la activación de la fase que corresponda.
2. INFORMAR de la desactivación y de la nueva fase, o de la desactivación del PEMUZ, a todos los organismos e instituciones intervinientes o involucrados.
3. ORDENAR LA RETIRADA DE LOS MEDIOS Y RECURSOS movilizados.
4. EVALUAR LAS AFECTACIONES a la població'),
('C084-0121',' DEL DIRECTOR DEL PLAN (seis):','
1. FORMALIZAR ADMINISTRATIVAMENTE la desactivación de la fase de emergencia, del PEMUZ en su caso, y la activación de la fase que corresponda.
2. INFORMAR de la desactivación y de la nueva fase, o de la desactivación del PEMUZ, a todos los organismos e instituciones intervinientes o involucrados.
3. ORDENAR LA RETIRADA DE LOS MEDIOS Y RECURSOS movilizados.
4. EVALUAR LAS AFECTACIONES a la població'),
('C084-0131','ACCIONES GENERALES (siete):','
1. Evaluar las afectaciones a población, infraestructuras y servicios, cuantificando su grado de deterioro.
2. Fijar las MEDIDAS PROVISIONALES Y/O PERMANENTES para paliar los efectos.
3. Establecer las ACTUACIONES PRIORITARIAS.
4. Determinar los medios necesarios para la reparación y rehabilitación.
5. Identificar los órganos del Plan y los servicios, organismos o instituciones responsables de la normalización.
6.…'),
('C084-0142','DIRECTOR DEL PLAN (diez):',' recabar y analizar la información y cuantificar las afectaciones · CONVOCAR AL COMITÉ ASESOR · establecer la ESTRATEGIA para recuperar la situación previa · PRIORIZAR LOS OBJETIVOS DE RECUPERACIÓN · DESIGNAR AL DIRECTOR DE OPERACIONES EN LA FASE DE RECUPERACIÓN · ordenar la movilización de recursos para rehabilitación y recuperación · ordenar y supervisar los comunicados sobre la recuperación · supervisar las…'),
('C084-0145','BINETE DE INFORMACIÓN (cinco):',' recopilar, contrastar y analizar los datos de los efectos relevantes para la población · difundir las medidas de rehabilitación y recuperación e informar de sus efectos · elaborar y difundir comunicados sobre previsiones y avances de la recuperación · elaborar y difundir recomendaciones y consejos durante la vuelta a la normalidad · organizar la atención a los medios de información.'),
('C084-0162','IRECTOR DE OPERACIONES (ocho):',' establecer las acciones técnicas para la recuperación · priorizar y secuenciar las medidas · MANTENER ACTUALIZADA UNA RELACIÓN DE LA POBLACIÓN Y BIENES QUE HAN RECUPERADO LA NORMALIDAD Y LOS QUE NO · informar al CECOPAZ · ESTIMAR LA DURACIÓN de la recuperación · asignar los medios a los Grupos de Acción · solicitar o desmovilizar medios según los efectos · PROPONER AL DIRECTOR DEL PLAN LA DESACTIVACIÓN DE LA FASE…'),
('C084-0189','ÉCNICO DE LA EMERGENCIA (dos):','
- Velar por una coordinación efectiva entre el CECOP y el CECOPAZ y, en su caso, con el PMA.
- Supervisar la ejecución de las directrices para la gestión de la emergencia.'),
('C084-0190',' GESTIÓN ADMINISTRATIVA (dos):','
- MANTENER COMUNICACIÓN CONTINUA CON EL CECOP MEDIANTE EL CENTRO DE COORDINACIÓN DE EMERGENCIAS 112 SOS ARAGÓN.
- Incorporar a sus protocolos a los nuevos medios y recursos que participen.'),
('C084-0191','E SE AÑADEN A LAS DEL NIVEL 1:','
DIRECTOR DEL PEMUZ (ocho):
- SOLICITAR, MOTIVADAMENTE, LA ACTIVACIÓN DE UN PLAN DE ÁMBITO SUPERIOR.'),
('C085-0005',' todas aprobadas por el Pleno:','
1) CORRECCIÓN DE ERRORES 2005 (Pleno 30/09/2005; BOPZ núm. 275, de 30/11/2005): relativa a los DISTINTIVOS DE MANDO correspondientes al JEFE DE UNIDAD y al JEFE DE GRUPO.
2) MODIFICACIÓN 2011 (Pleno 05/05/2011; BOPZ núm. 108, de 16/05/2011): afecta a los arts. 8, 17, 21, 23, 24, 27, 28, 29, 32 al 35, «disposiciones transitorias primera y segunda» y anexos II y III.
3) MODIFICACIÓN 2016 (Pleno 23/12/2015; BOPZ núm.…'),
('C085-0023','oluntarios en cuanto miembros;',' y su régimen de INCORPORACIÓN, SEPARACIÓN, FORMACIÓN Y DISCIPLINARIO.'),
('C085-0048',' PERSONAS FÍSICAS que cumplan:','
1) NACIONALIDAD española o ser ciudadano de la UNIÓN EUROPEA.
2) Estar EMPADRONADO Y RESIDIR en el término municipal de Zaragoza.
3) EDAD entre 18 Y 65 AÑOS. [Apartado 8.1.3: el ÚNICO tocado por la MODIFICACIÓN DE 2016.]
4) DISPONIBILIDAD DE TIEMPO para tareas objeto de protección civil.
5) SUPERAR UN CURSO DE FORMACIÓN Y SELECCIÓN impartido por los Servicios Municipales.
6) NO PERTENECER a cualqu'),
('C085-0069','CESE DEFINITIVO. CINCO CAUSAS:','
a) PETICIÓN del interesado, comunicada por escrito.
b) FALLECIMIENTO.
c) ENFERMEDAD O DEFECTO FÍSICO que incapacite, debidamente acreditados.
d) INCUMPLIMIENTO SOBREVENIDO de alguno de los requisitos del art. 8.
e) SANCIÓN, conforme al régimen sancionador del Reglamento y a la LEY 30/2002 de Protección Civil y Atención de Emergencias de Aragón.
El cese se acuerda, EXCEPTO EN LOS CASOS a) Y b), pre'),
('C085-0079','uario y los medios materiales;',' su reposición, según las NORMAS INTERNAS DEL SERVICIO.'),
('C085-0082','ÚBLICOS a que sean requeridos;',' USO OBLIGATORIO en INTERVENCIÓN ESPECIAL, SINIESTROS O CALAMIDADES, a efectos de PROTECCIÓN E IDENTIFICACIÓN.'),
('C085-0085','SISTENCIA MÉDICO-FARMACÉUTICA;',' y SEGURO DE RESPONSABILIDAD CIVIL para los daños y perjuicios que pueda causar un componente en sus actuaciones.'),
('C085-0089','SECCIÓN 1.ª DEL CAPÍTULO III:',' DERECHOS.'),
('C085-0090','DEBERES GENERALES, SIETE:','
1. CUMPLIR estrictamente los deberes reglamentarios y realizar TODOS los servicios solicitados SALVO CAUSA DE FUERZA MAYOR justificada; cooperar con esfuerzo, interés, DISCIPLINA Y ESPÍRITU SOCIAL en cualquier misión de socorro, ayuda y rescate de víctimas, evacuación, asistencia, vigilancia y protección de personas y bienes.
2. INCORPORARSE CON LA MAYOR BREVEDAD POSIBLE a su lugar de concentració'),
('C085-0091','A DE FUERZA MAYOR justificada;',' cooperar con esfuerzo, interés, DISCIPLINA Y ESPÍRITU SOCIAL en cualquier misión de socorro, ayuda y rescate de víctimas, evacuación, asistencia, vigilancia y protección de personas y bienes.'),
('C085-0096',' MAL TRATO O FALTA DE CUIDADO;',' en caso de baja, ENTREGA de todos los efectos.'),
('C085-0097','o, material y equipo confiado;',' A SU CARGO el resarcimiento de daños por MAL TRATO O FALTA DE CUIDADO; en caso de baja, ENTREGA de todos los efectos.'),
('C085-0113','ES OPERATIVOS, CUATRO NIVELES:','
- El INSPECTOR JEFE del Servicio, como JEFE DE LA AGRUPACIÓN.
- El SUBINSPECTOR del Servicio, como SUBJEFE.
- Los TÉCNICOS del Servicio, como COORDINADORES.
- Los VOLUNTARIOS ASIGNADOS por los técnicos como RESPONSABLES EN CADA EVENTO.
CUALQUIER TÉCNICO del Servicio debe colaborar en la coordinación a requerimiento del jefe del Servicio. Todo ello SIN PERJUICIO de lo que determine el PLAN DE EMERG'),
('C085-0122',' EL VOLUNTARIO ESTÁ EN ACTIVO:',' la BAJA conlleva la DEVOLUCIÓN de todo el vestuario y equipo.'),
('C085-0125','Salvamento y Protección Civil;',' los voluntarios SE ABSTIENEN de realizar cualquier servicio NO AUTORIZADO EXPRESAMENTE.'),
('C085-0130','as, carreras ciclistas, etc.):',' cada turno cubre durante UNA SEMANA todos los servicios del período, quedando DE RETÉN EL OTRO TURNO para reforzar al primero si fuera necesario.'),
('C085-0138','ATORIOS y de LIBRE ASISTENCIA;',' la formación COMPUTA A EFECTOS DE MÉRITO.'),
('C085-0140','ORMACIÓN BÁSICA de aspirantes;',' CURSOS DE PERFECCIONAMIENTO para voluntarios; y EJERCICIOS PRÁCTICOS PERIÓDICOS.'),
('C085-0141','CCIONAMIENTO para voluntarios;',' y EJERCICIOS PRÁCTICOS PERIÓDICOS.'),
('C085-0145','E LOS RESPONSABLES OPERATIVOS;',' las sugerencias NO SON VINCULANTES.'),
('C085-0147','os del ANEXO 3 del Reglamento:',' se DISTINGUEN las conductas meritorias y se SANCIONAN las infracciones.'),
('C085-0152','CIMIENTO PÚBLICO, en forma de:','
a) FELICITACIÓN de Alcaldía o del TENIENTE DE ALCALDE DELEGADO DEL ÁREA DE SERVICIOS PÚBLICOS, en su caso (personal o colectiva).
b) DIPLOMA AL MÉRITO (personal).
En CASOS ESPECIALES, propuesta de concesión de OTRAS CONDECORACIONES O DISTINCIONES OFICIALES, en procedimiento ordinario.'),
('C085-0195','DISPOSICIONES FINALES, DOS:','
1.ª HABILITACIÓN: el ALCALDE o el CONCEJAL DELEGADO de Prevención, Extinción de Incendios y Protección Civil dictarán las INSTRUCCIONES Y DIRECTRICES necesarias para el desarrollo y aplicación del Reglamento.'),
('C085-0200','quisito de residencia del art.',' 8.1.2.]'),
('C085-0201','icita CUATRO SITUACIONES tipo:','
1.º COMO MIEMBRO DE UN EQUIPO DE PRIMERA INTERVENCIÓN.'),
('C085-0207','EROS: informarles y apoyarles;',' si logra la extinción, esperar en el punto de emergencia la llegada del responsable y de los bomberos avisando de que la situación está controlada.'),
('C085-0208','ta la llegada de los bomberos;',' a su llegada, informar, CEDER LAS LABORES DE EXTINCIÓN y colaborar si son requeridos.'),
('C085-0209',' al punto si reciben la orden;',' actuar según instrucciones del responsable; si el incendio rebasa sus posibilidades, EVITAR EL AVANCE DEL FUEGO hasta la llegada de los bomberos; a su llegada, informar, CEDER LAS LABORES DE EXTINCIÓN y colaborar si son requeridos.'),
('C085-0211','entos de socorrismo que posee;',' al llegar los sanitarios, informarles y colaborar; solicitar los DATOS PERSONALES del afectado si es posible y dárselos al responsable o a los sanitarios.'),
('C085-0212','rios, informarles y colaborar;',' solicitar los DATOS PERSONALES del afectado si es posible y dárselos al responsable o a los sanitarios.'),
('C085-0214','rigirse a la persona afectada;',' avisar al responsable; si no hay personal sanitario, ATENDERLA HASTA SU LLEGADA con los conocimientos de socorrismo que posee; al llegar los sanitarios, informarles y colaborar; solicitar los DATOS PERSONALES del afectado si es posible y dárselos al responsable o a los sanitarios.'),
('C085-0216','orden, PREPARAR la evacuación;',' con la ALARMA GENERAL, ANUNCIARLA.'),
('C085-0217','vacuación «RÁPIDA Y ORDENADA»;',' ayudar a personas impedidas, disminuidas o heridas; NO PERMITIR recogida de objetos personales, NI el regreso a zonas evacuadas, NI el uso de ASCENSORES.'),
('C085-0220','edidas, disminuidas o heridas;',' NO PERMITIR recogida de objetos personales, NI el regreso a zonas evacuadas, NI el uso de ASCENSORES.'),
('C085-0221','guiar hacia vías practicables;',' canalizar y regular el tráfico de personas; TRANQUILIZAR pero con FIRMEZA para una evacuación «RÁPIDA Y ORDENADA»; ayudar a personas impedidas, disminuidas o heridas; NO PERMITIR recogida de objetos personales, NI el regreso a zonas evacuadas, NI el uso de ASCENSORES.'),
('C085-0222','egular el tráfico de personas;',' TRANQUILIZAR pero con FIRMEZA para una evacuación «RÁPIDA Y ORDENADA»; ayudar a personas impedidas, disminuidas o heridas; NO PERMITIR recogida de objetos personales, NI el regreso a zonas evacuadas, NI el uso de ASCENSORES.'),
('C085-0223',' que NO QUEDA NINGÚN REZAGADO;',' evacuada la instalación, dirigirse al PUNTO DE REUNIÓN.'),
('C085-0225','EL TRÁFICO en zonas asignadas;',' CONTROLAR ACCESOS; ACORDONAR ZONAS.'),
('C085-0226','EL TRÁFICO en zonas asignadas;',' CONTROLAR ACCESOS; ACORDONAR ZONAS.'),
('C085-0227','de los responsables asignados;',' EXCEPCIONALMENTE bajo las órdenes directas de mandos de otros servicios coordinados (policía, bomberos, sanitarios), PREVIA COMUNICACIÓN Y CONFIRMACIÓN del jefe de la Agrupación en ese evento o emergencia.'),
('C085-0236','JEFATURA los hechos conocidos;',' esta realiza indagaciones, consultas o gestiones para, en su caso, INICIAR EL EXPEDIENTE de sanción; igual para las acciones recompensables.'),
('C085-0237','CIAR EL EXPEDIENTE de sanción;',' igual para las acciones recompensables.'),
('C085-0259','as, carreras ciclistas, etc.):',' cada turno cubre durante UNA SEMANA todos los servicios del período, quedando DE RETÉN EL OTRO TURNO para reforzar al primero si fuera necesario.'),
('C085-0272','instrucciones del responsable;',' si el incendio rebasa sus posibilidades, EVITAR EL AVANCE DEL FUEGO hasta la llegada de los bomberos; a su llegada, informar, CEDER LAS LABORES DE EXTINCIÓN y colaborar si son requeridos.'),
('C085-0279','JEFATURA los hechos conocidos;',' esta realiza indagaciones, consultas o gestiones para, en su caso, INICIAR EL EXPEDIENTE de sanción; igual para las acciones recompensables.'),
('C085-0284','ORMACIÓN BÁSICA de aspirantes;',' CURSOS DE PERFECCIONAMIENTO para voluntarios; y EJERCICIOS PRÁCTICOS PERIÓDICOS.'),
('C085-0289','NSAS Y SANCIONES. TRES puntos:','
1. La Agrupación es, por la esencia de sus fines, una «ESCUELA DE CIUDADANÍA» con actitudes y ejemplos de SOLIDARIDAD, ALTRUISMO Y PARTICIPACIÓN. Deben ALABARSE Y PREMIARSE ante la colectividad las conductas ejemplares y REPRIMIRSE los actos individuales reprobables. Los voluntarios COMUNICAN A LA JEFATURA los hechos conocidos; esta realiza indagaciones, consultas o gestiones para, en su caso, INI')) as v(id, cola, ext)
  where b.id = v.id and right(b.cita, 30) = v.cola and (b.editada_at is null or b.id = 'C001-0021')
  returning 1)
select 'lote 11: ' || count(*) || ' de 160 citas ampliadas' as resultado from u;
