-- Lote 1: amplía la cita (texto literal que sigue en el bloque del corpus) de 160 preguntas.
-- Guardas: solo si la cita actual acaba exactamente como la que se amplió, y no está editada a mano.
with u as (
  update public.banco_preguntas b set cita = b.cita || v.ext, editada_at = now()
  from (values
('C001-0007','LOS I, REY DE ESPAÑA... SABED:',' QUE LAS CORTES HAN APROBADO Y EL PUEBLO ESPAÑOL RATIFICADO LA SIGUIENTE CONSTITUCIÓN».'),
('C001-0021',' nuestra PRIMERA CONSTITUCIÓN:',' LA CONSTITUCIÓN GADITANA DE 19 DE MARZO DE 1812.'),
('C001-0037','de estados de nuestro entorno:','
- CONSTITUCIÓN FRANCESA DE 1958: influye en la REGULACIÓN DE LOS PODERES DEL ESTADO.
- CONSTITUCIÓN ALEMANA (LEY FUNDAMENTAL DE BONN DE 1949): influye en la definición de ESTADO SOCIAL Y DEMOCRÁTICO DE DERECHO, en la SEPARACIÓN entre el Poder Legislativo y el Poder Ejecutivo, y en la regulación de la MOCIÓN DE CENSURA CONSTRUCTIVA.
- DECLARACIÓN UNIVERSAL DE DERECHOS HUMANOS (Asamblea General de l'),
('C001-0063','Se divide en CINCO CAPÍTULOS:','
- Capítulo primero: De los españoles y los extranjeros (arts. 11-13).
- Capítulo segundo: Derechos y libertades (arts. 14-38), con DOS SECCIONES: Sección 1.ª De los derechos fundamentales y de las libertades públicas (arts. 15-29) y Sección 2.ª De los derechos y deberes de los ciudadanos (arts. 30-38).
- Capítulo tercero: De los principios rectores de la política social y económica (arts. 39-52).
- Capítulo cuarto:…'),
('C001-0065','ts. 14-38), con DOS SECCIONES:',' Sección 1.ª De los derechos fundamentales y de las libertades públicas (arts. 15-29) y Sección 2.ª De los derechos y deberes de los ciudadanos (arts. 30-38).'),
('C001-0083','(arts. 66-96). TRES CAPÍTULOS:',' De las Cámaras; De la elaboración de las leyes; De los Tratados Internacionales.'),
('C001-0087','anía, PROCLAMA SU VOLUNTAD DE:','
1. Garantizar la CONVIVENCIA DEMOCRÁTICA dentro de la Constitución y de las leyes conforme a un orden económico y social justo.
2. Consolidar un ESTADO DE DERECHO que asegure el imperio de la ley como expresión de la voluntad popular.
3. PROTEGER a todos los españoles y pueblos de España en el ejercicio de los derechos humanos, sus culturas y tradiciones, lenguas e instituciones.
4. PROMOVER EL PROGRESO de la…'),
('C001-0097','anía, PROCLAMA SU VOLUNTAD DE:','
1. Garantizar la CONVIVENCIA DEMOCRÁTICA dentro de la Constitución y de las leyes conforme a un orden económico y social justo.
2. Consolidar un ESTADO DE DERECHO que asegure el imperio de la ley como expresión de la voluntad popular.
3. PROTEGER a todos los españoles y pueblos de España en el ejercicio de los derechos humanos, sus culturas y tradiciones, lenguas e instituciones.
4. PROMOVER EL PROGRESO de la…'),
('C001-0104','rmada CUATRO VECES desde 1978:','
1. REFORMA DE 27 DE AGOSTO DE 1992 (BOE-A-1992-20403). Modifica el APARTADO 2 DEL ARTÍCULO 13, para permitir el sufragio PASIVO de los extranjeros en las elecciones municipales. Motivo: adaptación al Tratado de Maastricht. En vigor desde el 28 de agosto de 1992.'),
('C001-0173','RES SUPERIORES, EN ESTE ORDEN:','
1. LA LIBERTAD.
2. LA JUSTICIA.
3. LA IGUALDAD.
4. EL PLURALISMO POLÍTICO.'),
('C001-0184',' DEL AIRE, tienen como misión:','
- GARANTIZAR LA SOBERANÍA E INDEPENDENCIA DE ESPAÑA.
- DEFENDER SU INTEGRIDAD TERRITORIAL.
- Y DEFENDER EL ORDENAMIENTO CONSTITUCIONAL.'),
('C001-0204','PÍTULOS: Principios generales;',' De la Administración Local; De las Comunidades Autónomas.'),
('C001-0218','sponde a los poderes públicos:','
- PROMOVER LAS CONDICIONES para que la LIBERTAD Y LA IGUALDAD del individuo y de los grupos en que se integra SEAN REALES Y EFECTIVAS.
- REMOVER LOS OBSTÁCULOS que impidan o dificulten su plenitud.
- FACILITAR LA PARTICIPACIÓN DE TODOS LOS CIUDADANOS en la vida POLÍTICA, ECONÓMICA, CULTURAL Y SOCIAL.'),
('C001-0243','ARTÍCULO 1.1, literal:','
«ESPAÑA SE CONSTITUYE EN UN ESTADO SOCIAL Y DEMOCRÁTICO DE DERECHO, QUE PROPUGNA COMO VALORES SUPERIORES DE SU ORDENAMIENTO JURÍDICO LA LIBERTAD, LA JUSTICIA, LA IGUALDAD Y EL PLURALISMO POLÍTICO.»'),
('C002-0005','s. 137 a 158). TRES CAPÍTULOS:','
- CAPÍTULO PRIMERO. PRINCIPIOS GENERALES (arts. 137 a 139).
- CAPÍTULO SEGUNDO. DE LA ADMINISTRACIÓN LOCAL (arts. 140 a 142).
- CAPÍTULO TERCERO. DE LAS COMUNIDADES AUTÓNOMAS (arts. 143 a 158).'),
('C002-0056',' (arts. 11-31). DOS CAPÍTULOS:','
- Capítulo I: Derechos y deberes de los aragoneses y aragonesas (arts. 11-19).
- Capítulo II: Principios rectores de las políticas públicas (arts. 20-31).'),
('C002-0076',' (arts. 63-69). DOS CAPÍTULOS:',' El Poder Judicial en Aragón (63-66) y La Administración de Justicia (67-69).'),
('C002-0077','de capítulo. CUATRO CAPÍTULOS:','
- Capítulo I: Las Cortes de Aragón (arts. 33-45).
- Capítulo II: El Presidente (arts. 46-52).
- Capítulo III: El Gobierno de Aragón o la Diputación General de Aragón (arts. 53-58).
- Capítulo IV: El Justicia de Aragón (arts. 59-60).'),
('C002-0091','forma requerirá, EN TODO CASO:','
- La aprobación de las CORTES DE ARAGÓN por MAYORÍA DE DOS TERCIOS.
- La aprobación de las CORTES GENERALES MEDIANTE LEY ORGÁNICA.'),
('C002-0136','TRES REQUISITOS ACUMULATIVOS:','
a) Que SOLICITEN la incorporación el Ayuntamiento o LA MAYORÍA DE LOS AYUNTAMIENTOS interesados, y que SE OIGA a la Comunidad o provincia a la que pertenezcan.
b) Que LO ACUERDEN LOS HABITANTES mediante CONSULTA expresamente convocada al efecto y previa la autorización competente.
c) Que los APRUEBEN LAS CORTES DE ARAGÓN y, POSTERIORMENTE, LAS CORTES GENERALES, MEDIANTE LEY ORGÁNICA.'),
('C002-0151','e el 28 de diciembre de 2022):','
1. Las Cortes de Aragón, según se establezca en la ley electoral, estarán integradas por un número de escaños COMPRENDIDO ENTRE SESENTA Y CINCO Y OCHENTA.
2. CADA PROVINCIA ESTARÁ REPRESENTADA, EN TODO CASO, POR UN MÍNIMO DE 14 ESCAÑOS.
3. Corresponderá a cada circunscripción un número de escaños tal que la cifra de habitantes necesarios para asignar uno a la circunscripción MÁS POBLADA NO SUPERE 3 VECES la…'),
('C002-0237','E DEL PRESIDENTE. OCHO CAUSAS:',' celebración de elecciones a Cortes de Aragón; aprobación de una moción de censura; pérdida de una cuestión de confianza; dimisión; INCAPACIDAD PERMANENTE reconocida por las Cortes POR MAYORÍA ABSOLUTA; SENTENCIA FIRME que le inhabilite; PÉRDIDA DE LA CONDICIÓN DE DIPUTADO; e INCOMPATIBILIDAD NO SUBSANADA.'),
('C002-0282','ARTÍCULO 71.57.ª:','
«PROTECCIÓN CIVIL, QUE INCLUYE, EN TODO CASO, LA REGULACIÓN, LA PLANIFICACIÓN, LA COORDINACIÓN Y LA EJECUCIÓN DE MEDIDAS RELATIVAS A EMERGENCIAS Y SEGURIDAD CIVIL ANTE INCENDIOS, CATÁSTROFES NATURALES, ACCIDENTES Y OTRAS SITUACIONES DE NECESIDAD.»'),
('C003-0007','. TRECE MATERIAS, entre ellas:','
1.ª SEGURIDAD SOCIAL, A EXCEPCIÓN DE LAS NORMAS QUE CONFIGURAN SU RÉGIMEN ECONÓMICO.'),
('C003-0026','CISIETE MATERIAS, entre ellas:','
1.ª GESTIÓN DE LA ASISTENCIA SANITARIA DE LA SEGURIDAD SOCIAL.'),
('C003-0029','ón, la intermediación laboral,',' LA PREVENCIÓN DE RIESGOS LABORALES Y LA SEGURIDAD Y SALUD EN EL TRABAJO, y la función inspectora propia.'),
('C003-0040','bjetivos y regula condiciones;',' en las COMPARTIDAS precisa normativamente los objetivos y completa las condiciones; en las EJECUTIVAS solo GESTIONA la tramitación y concesión.'),
('C003-0041','os y completa las condiciones;',' en las EJECUTIVAS solo GESTIONA la tramitación y concesión.'),
('C003-0043',' según el tipo de competencia:',' en las EXCLUSIVAS especifica objetivos y regula condiciones; en las COMPARTIDAS precisa normativamente los objetivos y completa las condiciones; en las EJECUTIVAS solo GESTIONA la tramitación y concesión.'),
('C003-0050','INTIDÓS MATERIAS, entre ellas:','
1.ª Organización de sus instituciones de autogobierno.'),
('C003-0057','os de interés de la Comunidad;',' LAS AGUAS MINERALES Y TERMALES.'),
('C003-0069','CANTIL, PENAL Y PENITENCIARIA;',' LEGISLACIÓN PROCESAL, sin perjuicio de las especialidades derivadas del derecho sustantivo de las Comunidades Autónomas.'),
('C003-0070','CANTIL, PENAL Y PENITENCIARIA;',' LEGISLACIÓN PROCESAL, sin perjuicio de las especialidades derivadas del derecho sustantivo de las Comunidades Autónomas.'),
('C003-0073','TATUTARIO DE SUS FUNCIONARIOS;',' EL PROCEDIMIENTO ADMINISTRATIVO COMÚN; legislación sobre EXPROPIACIÓN FORZOSA; legislación básica sobre CONTRATOS Y CONCESIONES y EL SISTEMA DE RESPONSABILIDAD de todas las Administraciones públicas.'),
('C003-0074','DIMIENTO ADMINISTRATIVO COMÚN;',' legislación sobre EXPROPIACIÓN FORZOSA; legislación básica sobre CONTRATOS Y CONCESIONES y EL SISTEMA DE RESPONSABILIDAD de todas las Administraciones públicas.'),
('C003-0075','ón sobre EXPROPIACIÓN FORZOSA;',' legislación básica sobre CONTRATOS Y CONCESIONES y EL SISTEMA DE RESPONSABILIDAD de todas las Administraciones públicas.'),
('C003-0088',' 149.3, TRES REGLAS DE CIERRE:','
- LAS MATERIAS NO ATRIBUIDAS EXPRESAMENTE AL ESTADO PODRÁN CORRESPONDER A LAS COMUNIDADES AUTÓNOMAS, EN VIRTUD DE SUS RESPECTIVOS ESTATUTOS.
- LA COMPETENCIA SOBRE LAS MATERIAS QUE NO SE HAYAN ASUMIDO POR LOS ESTATUTOS CORRESPONDERÁ AL ESTADO, cuyas normas PREVALECERÁN en caso de conflicto.
- EL DERECHO ESTATAL SERÁ, EN TODO CASO, SUPLETORIO DEL DERECHO DE LAS COMUNIDADES AUTÓNOMAS.'),
('C003-0127','TÍCULO 76. POLICÍA AUTONÓMICA:','
1. La Comunidad PODRÁ CREAR una Policía autonómica en el marco del Estatuto y DE LA LEY ORGÁNICA CORRESPONDIENTE.
3. Corresponde a la Comunidad LA COORDINACIÓN DE LA ACTUACIÓN DE LAS POLICÍAS LOCALES ARAGONESAS.
4. Se creará, en su caso, una JUNTA DE SEGURIDAD con REPRESENTACIÓN PARITARIA del Estado y la Comunidad Autónoma.'),
('C003-0132','CULO 79. ACTIVIDAD DE FOMENTO:',' en las materias de su competencia, la Comunidad puede OTORGAR SUBVENCIONES con cargo a fondos propios.'),
('C003-0148','TÍCULO 87. LEY DE CAPITALIDAD:','
ZARAGOZA, COMO CAPITAL DE ARAGÓN, DISPONDRÁ DE UN RÉGIMEN ESPECIAL ESTABLECIDO POR LEY DE CORTES DE ARAGÓN.'),
('C003-0166','DIMIENTO ADMINISTRATIVO COMÚN;',' legislación sobre EXPROPIACIÓN FORZOSA; legislación básica sobre CONTRATOS Y CONCESIONES y EL SISTEMA DE RESPONSABILIDAD de todas las Administraciones públicas.'),
('C004-0067',' del procedimiento referidas a',': LOS ÓRGANOS COMPETENTES, LOS PLAZOS propios del concreto procedimiento por razón de la materia, LAS FORMAS DE INICIACIÓN Y TERMINACIÓN, LA PUBLICACIÓN Y LOS INFORMES A RECABAR.'),
('C004-0070',' Ley tiene por objeto regular:','
- LOS REQUISITOS DE VALIDEZ Y EFICACIA DE LOS ACTOS ADMINISTRATIVOS.
- EL PROCEDIMIENTO ADMINISTRATIVO COMÚN A TODAS LAS ADMINISTRACIONES PÚBLICAS, INCLUYENDO EL SANCIONADOR Y EL DE RECLAMACIÓN DE RESPONSABILIDAD de las Administraciones Públicas.
- LOS PRINCIPIOS A LOS QUE SE HA DE AJUSTAR EL EJERCICIO DE LA INICIATIVA LEGISLATIVA Y LA POTESTAD REGLAMENTARIA.'),
('C004-0071','SECTOR PÚBLICO, QUE COMPRENDE:','
a) LA ADMINISTRACIÓN GENERAL DEL ESTADO.
b) LAS ADMINISTRACIONES DE LAS COMUNIDADES AUTÓNOMAS.
c) LAS ENTIDADES QUE INTEGRAN LA ADMINISTRACIÓN LOCAL.
d) EL SECTOR PÚBLICO INSTITUCIONAL.'),
('C004-0075',' INSTITUCIONAL SE INTEGRA POR:','
a) Cualesquiera ORGANISMOS PÚBLICOS Y ENTIDADES DE DERECHO PÚBLICO vinculados o dependientes de las Administraciones Públicas.
b) Las ENTIDADES DE DERECHO PRIVADO vinculadas o dependientes, sujetas a las normas de esta Ley que específicamente se refieran a ellas y, EN TODO CASO, CUANDO EJERZAN POTESTADES ADMINISTRATIVAS.
c) Las UNIVERSIDADES PÚBLICAS, que se regirán por SU NORMATIVA ESPECÍFICA Y SUPLETORIAMENTE por…'),
('C004-0103','nistraciones Públicas (32-35);',' 2.ª Responsabilidad de las autoridades y personal al servicio de las Administraciones Públicas (36-37).'),
('C004-0110','ITO SUBJETIVO. TRES APARTADOS:','
1. Se aplica AL SECTOR PÚBLICO, QUE COMPRENDE: a) la Administración General del Estado; b) las Administraciones de las Comunidades Autónomas; c) las Entidades que integran la Administración Local; d) el sector público institucional.
2. EL SECTOR PÚBLICO INSTITUCIONAL SE INTEGRA POR: a) cualesquiera organismos públicos y entidades de derecho público vinculados o dependientes; b) las entidades de derecho privado…'),
('C004-0111',' de las Comunidades Autónomas;',' c) las Entidades que integran la Administración Local; d) el sector público institucional.'),
('C004-0116','entes principios, ONCE LETRAS:','
a) Servicio efectivo a los ciudadanos.
b) Simplicidad, claridad y proximidad a los ciudadanos.
c) Participación, objetividad y transparencia de la actuación administrativa.
d) Racionalización y agilidad de los procedimientos administrativos y de las actividades materiales de gestión.
e) Buena fe, confianza legítima y lealtad institucional.
f) Responsabilidad por la gestión pública.
g) Planificación y dirección por…'),
('C004-0242','n: a) COMPETENCIAS DECISORIAS;',' b) competencias de PROPUESTA O EMISIÓN DE INFORMES PRECEPTIVOS que sirvan de base a decisiones de otros órganos; c) competencias de SEGUIMIENTO O CONTROL de actuaciones de otros órganos de la AGE.'),
('C004-0259','S DE ABSTENCIÓN, CINCO LETRAS:','
a) TENER INTERÉS PERSONAL en el asunto o en otro en cuya resolución pudiera influir la de aquél; SER ADMINISTRADOR de sociedad o entidad interesada; o TENER CUESTIÓN LITIGIOSA PENDIENTE con algún interesado.
b) TENER VÍNCULO MATRIMONIAL O SITUACIÓN DE HECHO ASIMILABLE y el PARENTESCO DE CONSANGUINIDAD DENTRO DEL CUARTO GRADO O DE AFINIDAD DENTRO DEL SEGUNDO con cualquiera de los interesados, con los administradores…'),
('C004-0273','ico vinculados o dependientes;',' b) las entidades de derecho privado vinculadas o dependientes, sujetas a las normas de esta Ley que específicamente se refieran a ellas, EN PARTICULAR A LOS PRINCIPIOS PREVISTOS EN EL ARTÍCULO 3, y EN TODO CASO CUANDO EJERZAN POTESTADES ADMINISTRATIVAS; c) las Universidades públicas, por su normativa específica y supletoriamente por esta Ley.'),
('C004-0276',' sus FUNCIONES Y COMPETENCIAS;',' c) DOTACIÓN DE LOS CRÉDITOS necesarios para su puesta en marcha y funcionamiento.'),
('C004-0278',' preceptivo no impide delegar;',' PERO NO PODRÁ DELEGARSE UNA VEZ EMITIDO ese dictamen o informe preceptivo.'),
('C004-0279','erlos por causas justificadas;',' d) DIRIMIR CON SU VOTO LOS EMPATES; e) ASEGURAR EL CUMPLIMIENTO DE LAS LEYES; f) VISAR las actas y certificaciones; g) cuantas otras funciones sean inherentes a su condición.'),
('C004-0280','R las actas y certificaciones;',' g) cuantas otras funciones sean inherentes a su condición.'),
('C004-0282','enfermedad u otra causa legal:',' POR EL VICEPRESIDENTE que corresponda y, en su defecto, POR EL MIEMBRO DE MAYOR JERARQUÍA, ANTIGÜEDAD Y EDAD, POR ESTE ORDEN.'),
('C004-0286','tiva o dependencia jerárquica;',' c) composición y criterios de designación del Presidente y de los restantes miembros; d) funciones de decisión, propuesta, informe, seguimiento o control; e) dotación de los créditos necesarios, en su caso.'),
('C004-0299','SEIS CAPÍTULOS (arts. 1 a 53):','
- CAPÍTULO I. Disposiciones generales (arts. 1-4).
- CAPÍTULO II. De los órganos de las Administraciones Públicas (arts. 5-24). CUATRO SECCIONES: 1.ª De los órganos administrativos (5-7); 2.ª Competencia (8-14); 3.ª Órganos colegiados de las distintas administraciones públicas (15-22), dividida a su vez en DOS SUBSECCIONES, 1.ª Funcionamiento (15-18) y 2.ª De los órganos colegiados en la Administr'),
('C004-0308','OSICIONES DE CARÁCTER GENERAL;',' c) LA RESOLUCIÓN DE RECURSOS en los órganos administrativos que hayan dictado los actos objeto de recurso; d) las materias en que así se determine POR NORMA CON RANGO DE LEY.'),
('C004-0324','R las actas y certificaciones;',' g) cuantas otras funciones sean inherentes a su condición.'),
('C005-0130','ano u órganos competentes para',': DEFINICIÓN DE ESPECIFICACIONES, PROGRAMACIÓN, MANTENIMIENTO, SUPERVISIÓN, CONTROL DE CALIDAD y, en su caso, AUDITORÍA DEL SISTEMA DE INFORMACIÓN Y DE SU CÓDIGO FUENTE.'),
('C005-0200','s. 3 a 12), con DOS CAPÍTULOS:','
- Capítulo I: La capacidad de obrar y el concepto de interesado (arts. 3-8).
- Capítulo II: Identificación y firma de los interesados en el procedimiento administrativo (arts. 9-12).'),
('C006-0063','ienen los siguientes derechos:','
a) A CONOCER, EN CUALQUIER MOMENTO, EL ESTADO DE LA TRAMITACIÓN de los procedimientos en los que tengan la condición de interesados; EL SENTIDO DEL SILENCIO ADMINISTRATIVO QUE CORRESPONDA, en caso de que la Administración no dicte ni notifique resolución expresa en plazo; el órgano competente para su instrucción, en su caso, y resolución; y los actos de trámite dictados. Asimismo, también tendrán'),
('C006-0064','e resolución expresa en plazo;',' el órgano competente para su instrucción, en su caso, y resolución; y los actos de trámite dictados.'),
('C006-0065','n la condición de interesados;',' EL SENTIDO DEL SILENCIO ADMINISTRATIVO QUE CORRESPONDA, en caso de que la Administración no dicte ni notifique resolución expresa en plazo; el órgano competente para su instrucción, en su caso, y resolución; y los actos de trámite dictados.'),
('C006-0066','ión, en su caso, y resolución;',' y los actos de trámite dictados.'),
('C006-0162','ONES: a) formular solicitudes;',' b) presentar declaraciones responsables o comunicaciones; c) interponer recursos; d) desistir de acciones; e) renunciar a derechos.'),
('C006-0166','ndrán los siguientes derechos:','
a) A SER NOTIFICADO DE LOS HECHOS QUE SE LE IMPUTEN, de las infracciones que tales hechos puedan constituir y de las sanciones que, en su caso, se les pudieran imponer, así como de la identidad del instructor, de la autoridad competente para imponer la sanción y de la norma que atribuya tal competencia.
b) A LA PRESUNCIÓN DE NO EXISTENCIA DE RESPONSABILIDAD ADMINISTRATIVA MIENTRAS NO SE DEMUESTRE'),
('C006-0168','ción deberá contener al menos:','
a) Identificación de la persona o personas presuntamente responsables.
b) Los hechos que motivan la incoación del procedimiento, su posible calificación y las sanciones que pudieran corresponder, sin perjuicio de lo que resulte de la instrucción.
c) Identificación del instructor y, en su caso, Secretario del procedimiento, con expresa indicación del régimen de recusación de los mismos.
d) Órgano competente para la…'),
('C008-0120','ATAMENTE EJECUTIVOS, SALVO QUE',':
a) Se produzca la suspensión de la ejecución del acto.'),
('C008-0165','te de los siguientes trámites:','
a) Inicio del procedimiento de oficio o a solicitud del interesado.
b) Subsanación de la solicitud presentada, en su caso.
c) ALEGACIONES FORMULADAS AL INICIO DEL PROCEDIMIENTO DURANTE EL PLAZO DE CINCO DÍAS.
d) Trámite de audiencia, ÚNICAMENTE CUANDO LA RESOLUCIÓN VAYA A SER DESFAVORABLE PARA EL INTERESADO.
e) Informe del servicio jurídico, cuando éste sea preceptivo.
f) Informe del Consejo Gener'),
('C008-0170','TAMENTE EJECUTIVOS, SALVO QUE:','
a) Se produzca la suspensión de la ejecución del acto.
b) Se trate de una resolución de un procedimiento de naturaleza sancionadora contra la que quepa algún recurso en vía administrativa, INCLUIDO EL POTESTATIVO DE REPOSICIÓN.
c) Una disposición establezca lo contrario.
d) SE NECESITE APROBACIÓN O AUTORIZACIÓN SUPERIOR.
2. Cuando de una resolución administrativa, o de cualquier otra forma de finalización del…'),
('C010-0010','tidades Locales TERRITORIALES:','
a) El Municipio.
b) La Provincia.
c) La Isla en los archipiélagos balear y canario.'),
('C010-0015','ONDICIÓN DE ENTIDADES LOCALES:','
a) Las Comarcas u otras entidades que agrupen varios Municipios, instituidas por las Comunidades Autónomas de conformidad con esta Ley y los correspondientes Estatutos de Autonomía.
b) Las Áreas Metropolitanas.
c) Las Mancomunidades de Municipios.'),
('C010-0066','ios SÓLO los siguientes datos:','
a) Nombre y apellidos.
b) Sexo.
c) Domicilio habitual, CON ESPECIFICACIÓN DE LA REFERENCIA CATASTRAL, en el territorio fiscal común o el código equivalente en los territorios forales, siempre que el domicilio cuente con referencia catastral o código equivalente.
d) Nacionalidad.
e) Lugar y fecha de nacimiento.
f) Número de documento nacional de identidad o, tratándose de extranjeros, número de identidad de…'),
('C010-0109','chos y deberes de los vecinos:','
a) Ser elector y elegible de acuerdo con lo dispuesto en la legislación electoral.
b) Participar en la gestión municipal de acuerdo con lo dispuesto en las leyes y, en su caso, cuando la colaboración con carácter voluntario de los vecinos sea interesada por los órganos de gobierno y administración municipal.
c) Utilizar, de acuerdo con su naturaleza, los servicios públicos municipales, y acceder a los…'),
('C010-0127','siguientes derechos y deberes:','
a) Ser elector y elegible en los términos establecidos en la legislación electoral.
b) Participar en la gestión municipal.
c) Utilizar los servicios públicos municipales de forma acorde con su naturaleza y acceder a los aprovechamientos comunales conforme a su regulación propia.
d) Ser informado, previa petición razonada, y dirigir solicitudes a la Administración Municipal en relación con los expe'),
('C010-0128','siguientes derechos y deberes:','
a) Ser elector y elegible en los términos establecidos en la legislación electoral.
b) Participar en la gestión municipal.
c) Utilizar los servicios públicos municipales de forma acorde con su naturaleza y acceder a los aprovechamientos comunales conforme a su regulación propia.
d) Ser informado, previa petición razonada, y dirigir solicitudes a la Administración Municipal en relación con los expe'),
('C010-0164',' fundarse en TRES FINALIDADES:',' a) disponer de una base territorial que mejore la capacidad económica y de gestión para la prestación y sostenimiento de los servicios públicos esenciales y obligatorios; b) favorecer el autogobierno y la participación; c) adaptar los términos a la realidad física, social y cultural de los núcleos de población. 3. NINGUNA ALTERACIÓN TERRITORIAL PODRÁ DAR LUGAR A UN TÉRMINO MUNICIPAL DISCONTINUO. 4. Cada municipio…'),
('C010-0169','UATRO SUPUESTOS DE ALTERACIÓN:',' a) INCORPORACIÓN total de un municipio a otro u otros limítrofes; b) FUSIÓN de dos o más municipios limítrofes para constituir uno nuevo; c) SEGREGACIÓN de parte de uno o varios municipios para constituir uno nuevo; d) SEGREGACIÓN de parte de un municipio para su AGREGACIÓN a otro limítrofe. 2. Podrán promoverse a instancia de los municipios o población afectada o DE OFICIO POR LA DIPUTACIÓN GENERAL DE ARAGÓN. 3.…'),
('C010-0176','ación o fusión), CINCO CAUSAS:',' a) cuando, por el desarrollo urbano, se unan los respectivos núcleos de población (si un municipio tuviera varios núcleos, la unión debe referirse al de mayor población o donde radique la capitalidad); b) cuando separadamente carezcan de recursos para los servicios mínimos obligatorios; c) cuando, POR DESPOBLAMIENTO, sea inviable el mantenimiento de una Administración autónoma o carezca de justificación la reserva…'),
('C010-0191','DEBEN CONCURRIR CONJUNTAMENTE:',' a) que, por el desarrollo urbano, rural o industrial, un núcleo consolide relaciones de convivencia y DEPENDENCIA FUNCIONAL de otro limítrofe; b) que existan motivos de interés general debidamente fundados.'),
('C010-0222','ALIDAD), TRES MOTIVOS TASADOS:',' a) DESAPARICIÓN DEL NÚCLEO DE POBLACIÓN donde estuviese establecida; b) MAYOR FACILIDAD DE ACCESO por parte de la mayoría de los vecinos; c) NUEVAS CIRCUNSTANCIAS DEMOGRÁFICAS, ECONÓMICAS O SOCIALES que determinen notorios beneficios para el conjunto de los habitantes. El municipio deberá justificar la previsión de los COSTES DE REINSTALACIÓN, sin que el mero cambio de capitalidad pueda justificar la petición de…'),
('C010-0243','de los municipios interesados,','
- dictamen del Consejo de Estado o del órgano consultivo superior de los Consejos de Gobierno de las Comunidades Autónomas, si existiere,
- informe de la Administración que ejerza la tutela financiera.'),
('C010-0248','ios para constituir uno nuevo;',' d) SEGREGACIÓN de parte de un municipio para su AGREGACIÓN a otro limítrofe.'),
('C010-0251','RCA, en el plazo de DOS MESES;',' transcurrido el plazo, se entiende cumplido el trámite.'),
('C010-0253','N donde estuviese establecida;',' b) MAYOR FACILIDAD DE ACCESO por parte de la mayoría de los vecinos; c) NUEVAS CIRCUNSTANCIAS DEMOGRÁFICAS, ECONÓMICAS O SOCIALES que determinen notorios beneficios para el conjunto de los habitantes.'),
('C010-0265',' 21 (EL PADRÓN DE HABITANTES):','
1. El padrón municipal es el REGISTRO ADMINISTRATIVO donde constan los vecinos del municipio. Sus datos constituyen PRUEBA DE LA RESIDENCIA en el municipio.
2. La FORMACIÓN, ACTUALIZACIÓN, REVISIÓN Y CUSTODIA del padrón corresponde AL MUNICIPIO, de acuerdo con las normas emanadas del Estado y las instrucciones complementarias que pueda establecer la Comunidad Autónoma dentro de su competencia en e'),
('C010-0270','reación de nuevos municipios):',' 1. Solo sobre la base de NÚCLEOS DE POBLACIÓN TERRITORIALMENTE DIFERENCIADOS con recursos suficientes. 2. La población que se atribuya la condición de residente ha de serlo A TODOS LOS EFECTOS: NO CUENTAN los conjuntos urbanizados destinados primordialmente a SEGUNDA RESIDENCIA O ESTANCIAS TEMPORALES sin base económica propia. 3. El asentamiento en un ENCLAVE DESHABITADO en virtud de concesión o autorización de…'),
('C010-0273','TOS EN EL GOBIERNO MUNICIPAL):',' en la FUSIÓN cesan TODOS los Alcaldes y Concejales y el Gobierno de Aragón designa una COMISIÓN GESTORA con tantos vocales como concejales correspondan a la población resultante.'),
('C010-0274','o de nombre o de capitalidad):','
1. Se inicia por ACUERDO MOTIVADO DEL PLENO O DE LA ASAMBLEA VECINAL. INFORMACIÓN PÚBLICA POR UN MES; resueltas las reclamaciones, aprobación provisional CON EL VOTO FAVORABLE DE LAS DOS TERCERAS PARTES DEL NÚMERO DE HECHO Y MAYORÍA ABSOLUTA DEL NÚMERO LEGAL.
2. El expediente se eleva a la Diputación General de Aragón. Si la nueva denominación puede CONFUNDIRSE con la de otro municipio, contiene INCORRECCIONES…'),
('C010-0279','Requerirán EN TODO CASO:','
- audiencia de los municipios interesados,
- dictamen del Consejo de Estado o del órgano consultivo superior de los Consejos de Gobierno de las Comunidades Autónomas, si existiere,
- informe de la Administración que ejerza la tutela financiera.
Simultáneamente a la petición de este dictamen se dará conocimiento a la Administración General del Estado.'),
('C010-0280',' municipio), CINCO REQUISITOS:',' a) uno o varios núcleos territorialmente diferenciados, haya dispuesto o no de administración descentralizada; b) POBLACIÓN MÍNIMA DE 1.000 HABITANTES, sin que el municipio matriz quede por debajo de esa cifra; c) que exista una FRANJA DE TERRENO CLASIFICADA COMO SUELO NO URBANIZABLE entre los núcleos principales del territorio a segregar y el de la capitalidad del municipio matriz; d) recursos suficientes y sin…'),
('C011-0299','ponde a las siguientes reglas:','
a) El ALCALDE, los TENIENTES DE ALCALDE y el PLENO existen EN TODOS los ayuntamientos.
b) La JUNTA DE GOBIERNO LOCAL existe en todos los municipios con POBLACIÓN SUPERIOR A 5.000 HABITANTES y en los de menos, cuando así lo disponga su reglamento orgánico o así lo acuerde el Pleno de su ayuntamiento.
c) En los municipios de MÁS DE 5.000 HABITANTES, y en los de menos en que así lo disponga su reglamento orgánico o…'),
('C011-0311','opios, presupuestos y cuentas;',' f) LAS CONTRATACIONES Y CONCESIONES DE TODA CLASE, salvo las atribuidas al Alcalde; g) proyectos de obras no previstos en presupuesto; h) ADQUISICIÓN DE BIENES Y DERECHOS cuando su valor supere el 10 POR 100 de los recursos ordinarios y, en todo caso, cuando sea superior a 500 MILLONES DE PESETAS; i) operaciones de crédito por encima del 10 por 100 de los recursos ordinarios (15 por 100 en tesorería); j) formas de…'),
('C011-0316','la Administración municipales;',' c) ORGANIZAR LOS SERVICIOS ADMINISTRATIVOS en el marco del Reglamento Orgánico; d) convocar y presidir Pleno, Comisión de Gobierno y cualesquiera otros órganos, y decidir los empates con voto de calidad; e) publicar, ejecutar y hacer cumplir los acuerdos; f) dirigir, inspeccionar e impulsar servicios y obras; g) DICTAR BANDOS Y VELAR POR SU CUMPLIMIENTO; h) gestión económica, autorizar y disponer gastos, RECONOCER…'),
('C011-0317',') representar al Ayuntamiento;',' b) dirigir el Gobierno y la Administración municipales; c) ORGANIZAR LOS SERVICIOS ADMINISTRATIVOS en el marco del Reglamento Orgánico; d) convocar y presidir Pleno, Comisión de Gobierno y cualesquiera otros órganos, y decidir los empates con voto de calidad; e) publicar, ejecutar y hacer cumplir los acuerdos; f) dirigir, inspeccionar e impulsar servicios y obras; g) DICTAR BANDOS Y VELAR POR SU CUMPLIMIENTO; h)…'),
('C011-0318','s empates con voto de calidad;',' e) publicar, ejecutar y hacer cumplir los acuerdos; f) dirigir, inspeccionar e impulsar servicios y obras; g) DICTAR BANDOS Y VELAR POR SU CUMPLIMIENTO; h) gestión económica, autorizar y disponer gastos, RECONOCER OBLIGACIONES, ordenar pagos y rendir cuentas; i) jefatura superior de todo el personal; j) JEFATURA DE LA POLICÍA MUNICIPAL; k) acciones judiciales y administrativas; l) ADOPTAR PERSONALMENTE Y BAJO SU…'),
('C011-0319',' e impulsar servicios y obras;',' g) DICTAR BANDOS Y VELAR POR SU CUMPLIMIENTO; h) gestión económica, autorizar y disponer gastos, RECONOCER OBLIGACIONES, ordenar pagos y rendir cuentas; i) jefatura superior de todo el personal; j) JEFATURA DE LA POLICÍA MUNICIPAL; k) acciones judiciales y administrativas; l) ADOPTAR PERSONALMENTE Y BAJO SU RESPONSABILIDAD, EN SITUACIONES DE GRAVE RIESGO, CATÁSTROFE O CALAMIDAD PÚBLICA, LAS MEDIDAS NECESARIAS Y…'),
('C011-0320',' judiciales y administrativas;',' l) ADOPTAR PERSONALMENTE Y BAJO SU RESPONSABILIDAD, EN SITUACIONES DE GRAVE RIESGO, CATÁSTROFE O CALAMIDAD PÚBLICA, LAS MEDIDAS NECESARIAS Y ADECUADAS, DANDO CUENTA INMEDIATA AL PLENO; ll) sancionar faltas de desobediencia e infracciones de ordenanzas; m) CONTRATACIONES Y CONCESIONES cuando no superen el 10 por 100 de los recursos ordinarios ni 1.000 MILLONES DE PESETAS, incluidas las plurianuales de duración no…'),
('C011-0321',' superior de todo el personal;',' j) JEFATURA DE LA POLICÍA MUNICIPAL; k) acciones judiciales y administrativas; l) ADOPTAR PERSONALMENTE Y BAJO SU RESPONSABILIDAD, EN SITUACIONES DE GRAVE RIESGO, CATÁSTROFE O CALAMIDAD PÚBLICA, LAS MEDIDAS NECESARIAS Y ADECUADAS, DANDO CUENTA INMEDIATA AL PLENO; ll) sancionar faltas de desobediencia e infracciones de ordenanzas; m) CONTRATACIONES Y CONCESIONES cuando no superen el 10 por 100 de los recursos…'),
('C011-0336','te título serán de aplicación:','
a) A los municipios cuya población SUPERE LOS 250.000 HABITANTES.
b) A los municipios CAPITALES DE PROVINCIA cuya población sea SUPERIOR A LOS 175.000 HABITANTES.
c) A los municipios que sean CAPITALES DE PROVINCIA, CAPITALES AUTONÓMICAS O SEDES DE LAS INSTITUCIONES AUTONÓMICAS.
d) Asimismo, a los municipios cuya población SUPERE LOS 75.000 HABITANTES, que presenten CIRCUNSTANCIAS ECONÓMICAS, SOCIALES, HISTÓRICAS…'),
('C011-0343','las entidades del artículo 45;',' la alteración de la capitalidad y el cambio de denominación, y la adopción o modificación de bandera, enseña o escudo.'),
('C012-0162','ncejal-secretario de la misma;',' d) el titular de la asesoría jurídica; e) el Secretario general del Pleno; f) el interventor general municipal; g) en su caso, el titular del órgano de gestión tributaria.'),
('C012-0163','de ESTABILIDAD PRESUPUESTARIA;',' b) SEPARACIÓN DE LAS FUNCIONES DE CONTABILIDAD Y DE FISCALIZACIÓN de la gestión económico-financiera; c) la contabilidad se ajustará a la Ley 39/1988 Reguladora de las Haciendas Locales; d) el ámbito de fiscalización y control de legalidad presupuestaria será el presupuesto o el estado de previsión de ingresos y gastos; e) introducción de la exigencia del SEGUIMIENTO DE LOS COSTES DE LOS SERVICIOS; f) la asignación…'),
('C012-0164','s ingresos de derecho público;',' c) tramitación y resolución de los expedientes sancionadores tributarios; d) análisis y diseño de la política global de ingresos públicos; e) propuesta, elaboración e interpretación de las normas tributarias propias; f) seguimiento y ordenación de la ejecución del presupuesto de ingresos tributarios.'),
('C012-0216','ASO, los servicios siguientes:','
a) EN TODOS LOS MUNICIPIOS: alumbrado público, cementerio, recogida de residuos, limpieza viaria, abastecimiento domiciliario de agua potable, alcantarillado, acceso a los núcleos de población y pavimentación de las vías públicas.'),
('C012-0224','ta de competencias delegables:',' vigilancia y control de la contaminación ambiental; protección del medio natural; prestación de servicios sociales, promoción de la igualdad de oportunidades y prevención de la violencia contra la mujer; conservación o mantenimiento de centros sanitarios asistenciales de titularidad autonómica; creación, mantenimiento y gestión de escuelas infantiles de primer ciclo de titularidad pública; actividades…'),
('C012-0225',' protección del medio natural;',' prestación de servicios sociales, promoción de la igualdad de oportunidades y prevención de la violencia contra la mujer; conservación o mantenimiento de centros sanitarios asistenciales de titularidad autonómica; creación, mantenimiento y gestión de escuelas infantiles de primer ciclo de titularidad pública; actividades complementarias en centros docentes; gestión de instalaciones culturales y deportivas de…'),
('C012-0226',' la violencia contra la mujer;',' conservación o mantenimiento de centros sanitarios asistenciales de titularidad autonómica; creación, mantenimiento y gestión de escuelas infantiles de primer ciclo de titularidad pública; actividades complementarias en centros docentes; gestión de instalaciones culturales y deportivas de titularidad autonómica o estatal; inspección y sanción de establecimientos y actividades comerciales; promoción y gestión…'),
('C012-0227','les de titularidad autonómica;',' creación, mantenimiento y gestión de escuelas infantiles de primer ciclo de titularidad pública; actividades complementarias en centros docentes; gestión de instalaciones culturales y deportivas de titularidad autonómica o estatal; inspección y sanción de establecimientos y actividades comerciales; promoción y gestión turística; comunicación, autorización, inspección y sanción de espectáculos públicos; liquidación…'),
('C012-0228','mentarias en centros docentes;',' gestión de instalaciones culturales y deportivas de titularidad autonómica o estatal; inspección y sanción de establecimientos y actividades comerciales; promoción y gestión turística; comunicación, autorización, inspección y sanción de espectáculos públicos; liquidación y recaudación de tributos propios de la Comunidad Autónoma o del Estado; inscripción de asociaciones, empresas o entidades en registros…'),
('C012-0229','ularidad autonómica o estatal;',' inspección y sanción de establecimientos y actividades comerciales; promoción y gestión turística; comunicación, autorización, inspección y sanción de espectáculos públicos; liquidación y recaudación de tributos propios de la Comunidad Autónoma o del Estado; inscripción de asociaciones, empresas o entidades en registros administrativos; gestión de oficinas unificadas de información y tramitación administrativa;…'),
('C012-0230','ción de espectáculos públicos;',' liquidación y recaudación de tributos propios de la Comunidad Autónoma o del Estado; inscripción de asociaciones, empresas o entidades en registros administrativos; gestión de oficinas unificadas de información y tramitación administrativa; cooperación con la Administración educativa a través de los centros asociados de la UNED.'),
('C012-0231','munidad Autónoma o del Estado;',' inscripción de asociaciones, empresas o entidades en registros administrativos; gestión de oficinas unificadas de información y tramitación administrativa; cooperación con la Administración educativa a través de los centros asociados de la UNED.'),
('C012-0232',' y tramitación administrativa;',' cooperación con la Administración educativa a través de los centros asociados de la UNED.'),
('C012-0243',' Secretario general del Pleno;',' f) el interventor general municipal; g) en su caso, el titular del órgano de gestión tributaria.'),
('C013-0090','cuado de las aguas residuales;',' alumbrado público; CEMENTERIO Y POLICÍA SANITARIA MORTUORIA; recogida, transporte y eliminación de residuos urbanos; pavimentación y conservación de las vías públicas, limpieza viaria, acceso a los núcleos de población; GESTIÓN DE LOS SERVICIOS SOCIALES DE BASE; CONTROL SANITARIO DE ALIMENTOS, BEBIDAS Y PRODUCTOS destinados al uso o consumo humano, así como de edificios y lugares de vivienda y convivencia humana y…'),
('C013-0091','OS SERVICIOS SOCIALES DE BASE;',' CONTROL SANITARIO DE ALIMENTOS, BEBIDAS Y PRODUCTOS destinados al uso o consumo humano, así como de edificios y lugares de vivienda y convivencia humana y de industrias, actividades y servicios, transportes, RUIDOS Y VIBRACIONES, y garantizar la tranquilidad y pacífica convivencia en los lugares de ocio y esparcimiento colectivo.'),
('C014-0014','presupuestario y contable, en:','
a) Organismos autónomos de carácter ADMINISTRATIVO.
b) Organismos autónomos de carácter COMERCIAL, INDUSTRIAL, FINANCIERO O ANÁLOGO.'),
('C014-0032','general se unirán como anexos:','
a) Los planes y programas de inversión y financiación que, para un plazo de CUATRO AÑOS, podrán formular los municipios y demás entidades locales de ámbito supramunicipal.
b) Los programas anuales de actuación, inversiones y financiación de las sociedades mercantiles de cuyo capital social sea titular único o PARTÍCIPE MAYORITARIO la entidad local.
c) El estado de CONSOLIDACIÓN del presupuesto de la propia entidad…'),
('C014-0100','mes de aportación de terceros;',' b) la concesión de las autorizaciones del art. 53, si existen previsiones iniciales en el CAPÍTULO IX del estado de ingresos.'),
('C014-0109','iato siguiente, 70 POR CIENTO;',' segundo ejercicio, 60 POR CIENTO; tercero y cuarto, 50 POR CIENTO.'),
('C014-0110','undo ejercicio, 60 POR CIENTO;',' tercero y cuarto, 50 POR CIENTO.'),
('C014-0112','io futuro no podrá exceder de:',' ejercicio inmediato siguiente, 70 POR CIENTO; segundo ejercicio, 60 POR CIENTO; tercero y cuarto, 50 POR CIENTO.'),
('C014-0119','éditos en el supuesto del art.',' 182.3.'),
('C014-0120',' momento de su reconocimiento:','
a) Las que resulten de la liquidación de ATRASOS a favor del personal.
b) Las derivadas de COMPROMISOS DE GASTOS debidamente adquiridos en ejercicios anteriores, previa INCORPORACIÓN de los créditos en el supuesto del art. 182.3.'),
('C014-0134','optados con el quórum del art.',' 47.3 de la Ley 7/1985, se considerarán recursos disponibles para financiar nuevos o mayores gastos POR OPERACIONES CORRIENTES, declarados necesarios y urgentes, los procedentes de OPERACIONES DE CRÉDITO en que se den CONJUNTAMENTE:
— Que su importe total anual no supere el CINCO POR CIENTO de los recursos por operaciones corrientes del presupuesto.'),
('C014-0154','ZA NO TRIBUTARIA derivados de:','
a) Aportaciones o compromisos firmes de aportación de personas físicas o jurídicas para financiar, juntamente con la entidad, gastos comprendidos en sus fines u objetivos.
b) ENAJENACIONES de bienes.
c) PRESTACIÓN DE SERVICIOS.
d) REEMBOLSO DE PRÉSTAMOS.
e) REINTEGROS DE PAGOS INDEBIDOS con cargo al presupuesto corriente, en cuanto a reposición del crédito en la correspondiente cuantía.'),
('C014-0186','os siguientes LÍMITES MÍNIMOS:','
a) Derechos pendientes de cobro liquidados dentro de los presupuestos de los DOS EJERCICIOS ANTERIORES al que corresponde la liquidación: se minorarán, como mínimo, en un 25 POR CIENTO.
b) Del EJERCICIO TERCERO ANTERIOR: 50 POR CIENTO.
c) De los ejercicios CUARTO A QUINTO ANTERIORES: 75 POR CIENTO.
d) De los RESTANTES ejercicios anteriores: 100 POR CIENTO.'),
('C014-0244','io futuro no podrá exceder de:',' ejercicio inmediato siguiente, 70 POR CIENTO; segundo ejercicio, 60 POR CIENTO; tercero y cuarto, 50 POR CIENTO.'),
('C014-0264','cio futuro no podrá exceder de',': ejercicio inmediato siguiente, 70 POR CIENTO; segundo ejercicio, 60 POR CIENTO; tercero y cuarto, 50 POR CIENTO.'),
('C015-0015','restarán ASISTENCIA recíproca;',' c) se COMUNICARÁN INMEDIATAMENTE los hechos con trascendencia tributaria detectados en actuaciones inspectoras; d) podrán elaborar PLANES DE INSPECCIÓN CONJUNTA O COORDINADA.'),
('C015-0042','a Ley 7/1985 y a estas reglas:',' a) la DEVOLUCIÓN DE INGRESOS INDEBIDOS y la RECTIFICACIÓN DE ERRORES MATERIALES se ajustarán a los arts. 32 y 220 de la LGT; b) NO SERÁN EN NINGÚN CASO REVISABLES los actos confirmados por SENTENCIA JUDICIAL FIRME.'),
('C015-0064','art. 15.1 contendrán AL MENOS:','
a) La determinación del HECHO IMPONIBLE, SUJETO PASIVO, RESPONSABLES, EXENCIONES, REDUCCIONES Y BONIFICACIONES, BASE IMPONIBLE Y LIQUIDABLE, TIPO DE GRAVAMEN O CUOTA TRIBUTARIA, PERÍODO IMPOSITIVO Y DEVENGO.
b) Los REGÍMENES DE DECLARACIÓN E INGRESO.
c) Las FECHAS de su aprobación y del COMIENZO DE SU APLICACIÓN.'),
('C015-0098','tadas, escaparates y vitrinas;',' rodaje y arrastre de vehículos no gravados por el IVTM; tránsito de ganados; muros de contención; depósitos y distribuidores de combustible; anuncios; pasos sobre cunetas; ESTACIONAMIENTO de vehículos en zonas determinadas; y v) en las ZONAS DE BAJAS EMISIONES, la circulación de vehículos que superen los límites o categorías máximas establecidos.'),
('C015-0111','ias; residencias y guarderías;',' piscinas e instalaciones deportivas; CEMENTERIOS y servicios fúnebres; ALCANTARILLADO y depuración; RECOGIDA DE RESIDUOS sólidos urbanos; distribución de agua, gas y electricidad; matadero, lonjas y mercados; enseñanzas especiales; visitas a museos; enarenado de vías a solicitud de particulares; y actividades singulares de regulación y control del TRÁFICO URBANO distintas de las habituales de la Policía Municipal.'),
('C015-0114','táculos y grandes transportes;',' LICENCIAS URBANÍSTICAS o actividades de control cuando la licencia se sustituya por declaración responsable o comunicación previa; licencias de APERTURA en los mismos términos; inspección de vehículos, calderas, ASCENSORES y montacargas; k) SERVICIOS DE PREVENCIÓN Y EXTINCIÓN DE INCENDIOS, DE PREVENCIÓN DE RUINAS, CONSTRUCCIONES Y DERRIBOS, SALVAMENTOS Y, EN GENERAL, DE PROTECCIÓN DE PERSONAS Y BIENES,…'),
('C015-0121',' por los siguientes servicios:','
a) ABASTECIMIENTO DE AGUAS EN FUENTES PÚBLICAS.
b) ALUMBRADO DE VÍAS PÚBLICAS.
c) VIGILANCIA PÚBLICA EN GENERAL.
d) PROTECCIÓN CIVIL.
e) LIMPIEZA DE LA VÍA PÚBLICA.
f) ENSEÑANZA EN LOS NIVELES DE EDUCACIÓN OBLIGATORIA.'),
('C015-0137',' SUSTITUTOS DEL CONTRIBUYENTE:','
a) En las tasas por servicios que beneficien o afecten a los OCUPANTES de viviendas o locales, los PROPIETARIOS, quienes podrán REPERCUTIR las cuotas sobre los beneficiarios.
b) En las tasas por LICENCIAS URBANÍSTICAS, los CONSTRUCTORES Y CONTRATISTAS de obras.
c) En las tasas por SERVICIOS DE PREVENCIÓN Y EXTINCIÓN DE INCENDIOS, de prevención de ruinas, construcciones y derribos, salvamentos y, e'),
('C015-0158','PÓSITO PREVIO total o parcial;',' b) cuando SE PRESENTE LA SOLICITUD, que no se tramitará sin el pago.'),
('C015-0165','S DE SUS BIENES PATRIMONIALES;',' b) los que realicen por haberles sido ATRIBUIDOS O DELEGADOS por otras entidades públicas y aquellos cuya titularidad hayan asumido; c) los que realicen OTRAS ENTIDADES PÚBLICAS, o sus concesionarios, CON APORTACIONES ECONÓMICAS DE LA ENTIDAD LOCAL.'),
('C015-0166','uya titularidad hayan asumido;',' c) los que realicen OTRAS ENTIDADES PÚBLICAS, o sus concesionarios, CON APORTACIONES ECONÓMICAS DE LA ENTIDAD LOCAL.'),
('C015-0179','porte de las obras o trabajos;',' c) VALOR DE LOS TERRENOS que hubieren de ocupar permanentemente, SALVO bienes de uso público, terrenos cedidos gratuita y obligatoriamente, o inmuebles cedidos conforme al art. 145 de la Ley 33/2003; d) INDEMNIZACIONES por derribos, destrucción de plantaciones y a los arrendatarios; e) INTERÉS DEL CAPITAL INVERTIDO si hubo que apelar al crédito.'),
('C015-0181','aciones y a los arrendatarios;',' e) INTERÉS DEL CAPITAL INVERTIDO si hubo que apelar al crédito.'),
('C015-0186','ente, como MÓDULOS DE REPARTO:',' los METROS LINEALES DE FACHADA, la SUPERFICIE, el VOLUMEN EDIFICABLE y el VALOR CATASTRAL a efectos del IBI.'),
('C015-0215','etos pasivos con estas reglas:','
a) Con carácter general, conjunta o separadamente, como MÓDULOS DE REPARTO: los METROS LINEALES DE FACHADA, la SUPERFICIE, el VOLUMEN EDIFICABLE y el VALOR CATASTRAL a efectos del IBI.
b) Si se trata del ESTABLECIMIENTO Y MEJORA DEL SERVICIO DE EXTINCIÓN DE INCENDIOS, podrán distribuirse entre las entidades o sociedades que CUBRAN EL RIESGO por bienes sitos en el municipio, PROPORCIONALMENTE AL IMPORTE DE LAS…'),
('C015-0256','án especialmente beneficiadas:','
a) En obras o servicios que afecten a BIENES INMUEBLES, sus PROPIETARIOS.
b) En obras o servicios a consecuencia de EXPLOTACIONES EMPRESARIALES, los TITULARES de éstas.
c) En el ESTABLECIMIENTO O AMPLIACIÓN DE LOS SERVICIOS DE EXTINCIÓN DE INCENDIOS, además de los propietarios de los bienes afectados, LAS COMPAÑÍAS DE SEGUROS que desarrollen su actividad en el ramo en el término municipal.
d) En la construcción de…'),
('C016-0053','ADOS CORRIENTES del ejercicio;',' en sociedades mercantiles locales: los RESULTADOS DE LA ACTIVIDAD ORDINARIA, excluidos intereses, minorados igualmente en una anualidad teórica.'),
('C016-0084','de CARACTERÍSTICAS ESPECIALES:','
a) De una CONCESIÓN ADMINISTRATIVA sobre los propios inmuebles o sobre los servicios públicos a que se hallen afectos.
b) De un derecho real de SUPERFICIE.
c) De un derecho real de USUFRUCTO.
d) Del derecho de PROPIEDAD.'),
('C016-0094','ros mediante contraprestación;',' y los bienes PATRIMONIALES, exceptuados igualmente los cedidos a terceros mediante contraprestación.'),
('C016-0095','público afectos a uso público;',' los de dominio público afectos a un servicio público gestionado DIRECTAMENTE por el ayuntamiento, EXCEPTO los cedidos a terceros mediante contraprestación; y los bienes PATRIMONIALES, exceptuados igualmente los cedidos a terceros mediante contraprestación.'),
('C016-0096','IPIOS EN QUE ESTÉN ENCLAVADOS:',' los de dominio público afectos a uso público; los de dominio público afectos a un servicio público gestionado DIRECTAMENTE por el ayuntamiento, EXCEPTO los cedidos a terceros mediante contraprestación; y los bienes PATRIMONIALES, exceptuados igualmente los cedidos a terceros mediante contraprestación.'),
('C016-0113','les o servicios profesionales;',' 3.º la EXPOSICIÓN DE ARTÍCULOS con fin exclusivo de DECORACIÓN O ADORNO del establecimiento (sí está sujeta la exposición de artículos PARA REGALO a los clientes); 4.º en venta AL POR MENOR, la realización de UN SOLO ACTO U OPERACIÓN AISLADA.'),
('C016-0124','PRIMEROS PERÍODOS IMPOSITIVOS;',' TODAS LAS PERSONAS FÍSICAS, sean o no residentes; y los sujetos del Impuesto sobre Sociedades y entidades del art. 35.4 LGT con IMPORTE NETO DE LA CIFRA DE NEGOCIOS INFERIOR A 1.000.000 DE EUROS.'),
('C016-0125','FÍSICAS, sean o no residentes;',' y los sujetos del Impuesto sobre Sociedades y entidades del art. 35.4 LGT con IMPORTE NETO DE LA CIFRA DE NEGOCIOS INFERIOR A 1.000.000 DE EUROS.'),
('C016-0126','ES y sus organismos autónomos;',' quienes INICIEN su actividad, durante los DOS PRIMEROS PERÍODOS IMPOSITIVOS; TODAS LAS PERSONAS FÍSICAS, sean o no residentes; y los sujetos del Impuesto sobre Sociedades y entidades del art. 35.4 LGT con IMPORTE NETO DE LA CIFRA DE NEGOCIOS INFERIOR A 1.000.000 DE EUROS.'),
('C016-0184','EN LA FECHA DE LA TRANSMISIÓN;',' b) cuando se CONSTITUYA O TRANSMITA UN DERECHO REAL de goce limitativo del dominio, EN LA FECHA en que tenga lugar la constitución o transmisión.'),
('C016-0191','art. 110.2), desde el devengo:','
a) Actos ÍNTER VIVOS: TREINTA DÍAS HÁBILES.
b) Actos POR CAUSA DE MUERTE: SEIS MESES, PRORROGABLES HASTA UN AÑO a solicitud del sujeto pasivo.')) as v(id, cola, ext)
  where b.id = v.id and right(b.cita, 30) = v.cola and (b.editada_at is null or b.id = 'C001-0021')
  returning 1)
select 'lote 1: ' || count(*) || ' de 160 citas ampliadas' as resultado from u;
