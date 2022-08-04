INSERT INTO specialty ("name") VALUES ('CARDIOLOGIA');
INSERT INTO specialty ("name") VALUES ('ORTOPEDIA');

INSERT INTO days ("name") VALUES ('SEGUNDA-FEIRA');
INSERT INTO days ("name") VALUES ('QUARTA-FEIRA');
INSERT INTO days ("name") VALUES ('SEXTA-FEIRA');

INSERT INTO public."specialtiesDays"("specialtyId", "daysId") VALUES (1, 3);
INSERT INTO public."specialtiesDays"("specialtyId", "daysId") VALUES (1, 1);
INSERT INTO public."specialtiesDays"("specialtyId", "daysId") VALUES (2, 1);
INSERT INTO public."specialtiesDays"("specialtyId", "daysId") VALUES (2, 2);
INSERT INTO public."specialtiesDays"("specialtyId", "daysId") VALUES (2, 3);

INSERT INTO doctor(name, crm, "specialtyId") VALUES ('Giovana Gonçalves', 'CRM/SP 123456', 1);
INSERT INTO doctor(name, crm, "specialtyId") VALUES ('FÁBIO ARRUDA', 'CRM/RJ 558456', 1);
INSERT INTO doctor(name, crm, "specialtyId") VALUES ('CRISTINA SILVA', 'CRM/PB 123456', 2);
INSERT INTO doctor(name, crm, "specialtyId") VALUES ('AURORA ARAÚJO', 'CRM/SP 413731', 2);