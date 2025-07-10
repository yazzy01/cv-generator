        {/* Pages Container */}
        <Box
          id="cv-pages-container"
          sx={{
            position: 'relative',
            width: '210mm',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            maxHeight: '297mm',
            overflow: 'hidden',
          }}
        >
          {/* Page 1 */}
          <Paper
            className="cv-page"
            elevation={1}
            sx={{
              width: '210mm',
              height: '297mm',
              position: 'relative',
              backgroundColor: '#ffffff',
              overflow: 'hidden',
              p: 2.5,
              boxSizing: 'border-box',
            }}
          >
          </Paper>

          {/* Page 2 */}
          <Paper
            className="cv-page"
            elevation={1}
            sx={{
              width: '210mm',
              height: '297mm',
              position: 'relative',
              backgroundColor: '#ffffff',
              overflow: 'hidden',
              p: 2.5,
              boxSizing: 'border-box',
            }}
          >
            {/* Header for page 2 */}
            <Box sx={{ 
              mb: 2, 
              position: 'relative',
              pb: 1.5,
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '1px',
                background: 'linear-gradient(90deg, #6200ee, transparent)',
              },
            }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 700, 
                color: '#121212',
                fontFamily: '"Roboto Mono", monospace',
                fontSize: '1.2rem',
              }}>
                {data.personalInfo.fullName} - Continued
              </Typography>
            </Box>

            {/* Two-column layout for page 2 */}
            <Grid container spacing={1.5}>
              {/* Left column */}
              <Grid item xs={6.5}>
                {/* More Experience */}
                <Section>
                  <SectionTitle>
                    <Work /> Additional Experience
                  </SectionTitle>
                  {data.experience.slice(2).map((exp, index) => (
                    <ExperienceCard key={index}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 600, 
                          color: theme.palette.primary.main,
                          fontSize: '0.95rem'
                        }}>
                          {exp.position}
                        </Typography>
                        <Box sx={{ 
                          bgcolor: 'rgba(98, 0, 238, 0.1)', 
                          px: 1, 
                          py: 0.5, 
                          borderRadius: 4,
                          fontSize: '0.7rem',
                          fontFamily: '"Roboto Mono", monospace',
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                        }}>
                          {exp.startDate} - {exp.endDate}
                        </Box>
                      </Box>
                      <Typography variant="subtitle1" sx={{ mb: 1, fontSize: '0.85rem' }}>
                        <span style={{ fontWeight: 500 }}>{exp.company}</span> | {exp.location}
                      </Typography>
                      <Box sx={{ pl: 0.5 }}>
                        {exp.responsibilities.map((resp, idx) => (
                          <Typography key={idx} variant="body2" sx={{ 
                            display: 'flex', 
                            alignItems: 'flex-start',
                            mb: 0.5,
                            fontSize: '0.8rem',
                            '&:before': {
                              content: '">"',
                              mr: 1,
                              color: theme.palette.primary.main,
                              fontFamily: '"Roboto Mono", monospace',
                              fontWeight: 'bold',
                            }
                          }}>
                            {resp}
                          </Typography>
                        ))}
                      </Box>
                    </ExperienceCard>
                  ))}
                </Section>

                {/* Social Media */}
                <Section>
                  <SectionTitle>
                    <Language /> Social Media & Profiles
                  </SectionTitle>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {data.socialMedia.map((social, index) => (
                      <Box key={index} sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        p: 1,
                        borderRadius: '8px',
                        border: '1px solid rgba(98, 0, 238, 0.1)',
                        backgroundColor: 'rgba(98, 0, 238, 0.02)'
                      }}>
                        <Box sx={{ 
                          width: 30, 
                          height: 30, 
                          borderRadius: '50%', 
                          bgcolor: 'rgba(98, 0, 238, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: theme.palette.primary.main,
                          fontWeight: 'bold',
                          fontSize: '0.8rem'
                        }}>
                          {social.platform.charAt(0)}
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600 }}>
                            {social.platform}
                          </Typography>
                          <Typography sx={{ 
                            fontSize: '0.75rem', 
                            color: theme.palette.primary.main,
                            fontFamily: '"Roboto Mono", monospace',
                          }}>
                            {social.username}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Section>
              </Grid>

              {/* Right column */}
              <Grid item xs={5.5}>
                {/* Additional Technical Skills */}
                <Section>
                  <SectionTitle>
                    <Settings /> Additional Skills
                  </SectionTitle>
                  
                  {data.technicalSkills.slice(3).map((skillGroup, index) => {
                    const category = getSkillCategory(skillGroup.category);
                    
                    return (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                          <Typography variant="subtitle1" sx={{ 
                            fontWeight: 600, 
                            fontSize: '0.8rem',
                            color: category === 'ai' 
                              ? theme.palette.primary.main 
                              : category === 'dev' 
                                ? theme.palette.info.main 
                                : theme.palette.text.primary
                          }}>
                            {skillGroup.category}
                          </Typography>
                          <Box sx={{ 
                            bgcolor: category === 'ai' 
                              ? 'rgba(98, 0, 238, 0.1)' 
                              : category === 'dev' 
                                ? 'rgba(33, 150, 243, 0.1)' 
                                : 'rgba(0, 0, 0, 0.05)', 
                            px: 1, 
                            py: 0.2, 
                            borderRadius: 4,
                            fontSize: '0.6rem',
                            fontFamily: '"Roboto Mono", monospace',
                            color: category === 'ai' 
                              ? theme.palette.primary.main 
                              : category === 'dev' 
                                ? theme.palette.info.main 
                                : theme.palette.text.secondary,
                          }}>
                            {category === 'ai' ? 'AI/ML' : category === 'dev' ? 'Development' : 'General'}
                          </Box>
                        </Box>
                        
                        <SkillProgress 
                          variant="determinate" 
                          value={95} 
                          color={category === 'ai' ? 'primary' : category === 'dev' ? 'info' : 'secondary'}
                        />
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {skillGroup.skills.map((skill, idx) => (
                            category === 'ai' ? (
                              <AIChip key={idx} label={skill} size="small" />
                            ) : (
                              <FullStackChip key={idx} label={skill} size="small" />
                            )
                          ))}
                        </Box>
                      </Box>
                    );
                  })}
                </Section>
                
                {/* More Certifications */}
                <Section>
                  <SectionTitle>
                    <School /> Additional Certifications
                  </SectionTitle>
                  
                  {/* Top 2 Certifications */}
                  <Typography variant="subtitle1" sx={{ 
                    fontWeight: 600, 
                    mt: 1,
                    mb: 0.5,
                    fontSize: '0.8rem',
                    color: theme.palette.warning.main,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}>
                    <Work fontSize="small" /> Key Certifications
                  </Typography>
                  
                  {data.certifications.slice(0, 2).map((cert, index) => (
                    <Box key={index} sx={{ 
                      mb: 1,
                      pl: 1,
                      borderLeft: `2px solid ${theme.palette.warning.main}`
                    }}>
                      <Typography variant="subtitle2" sx={{ 
                        fontWeight: 600,
                        fontSize: '0.75rem'
                      }}>
                        {cert.title}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: theme.palette.text.secondary,
                        fontSize: '0.7rem',
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}>
                        <span>{cert.organization}</span>
                        <span style={{ 
                          fontFamily: '"Roboto Mono", monospace',
                          fontSize: '0.65rem'
                        }}>{cert.date}</span>
                      </Typography>
                      {cert.details && cert.details.length > 0 && (
                        <Typography variant="body2" sx={{ 
                          color: theme.palette.text.secondary,
                          fontSize: '0.7rem',
                          mt: 0.3,
                          fontStyle: 'italic'
                        }}>
                          {cert.details[0]}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Section>

                <Section>
                  <SectionTitle>
                    <Code /> Full Stack Development
                  </SectionTitle>
                  <ExperienceCard>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600, 
                      color: theme.palette.info.main,
                      fontSize: '0.9rem',
                      mb: 1,
                    }}>
                      Backend Development Specialist
                    </Typography>
                    <Box sx={{ pl: 0.5, mb: 1.5 }}>
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}>
                        <span style={{ 
                          fontFamily: '"Roboto Mono", monospace', 
                          color: theme.palette.info.main,
                          marginRight: '8px',
                        }}>•</span>
                        API design and development with focus on data processing
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}>
                        <span style={{ 
                          fontFamily: '"Roboto Mono", monospace', 
                          color: theme.palette.info.main,
                          marginRight: '8px',
                        }}>•</span>
                        Database management for AI training datasets
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}>
                        <span style={{ 
                          fontFamily: '"Roboto Mono", monospace', 
                          color: theme.palette.info.main,
                          marginRight: '8px',
                        }}>•</span>
                        Integration of ML models with web applications
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}>
                        <span style={{ 
                          fontFamily: '"Roboto Mono", monospace', 
                          color: theme.palette.info.main,
                          marginRight: '8px',
                        }}>•</span>
                        Quality assurance and testing for AI-driven applications
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}>
                        <span style={{ 
                          fontFamily: '"Roboto Mono", monospace', 
                          color: theme.palette.info.main,
                          marginRight: '8px',
                        }}>•</span>
                        Implementing security best practices for data handling
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <FullStackChip label="Python" size="small" />
                      <FullStackChip label="API Development" size="small" />
                      <FullStackChip label="Database Management" size="small" />
                      <FullStackChip label="Quality Assurance" size="small" />
                      <FullStackChip label="Security" size="small" />
                    </Box>
                  </ExperienceCard>
                </Section>
              </Grid>
            </Grid>

            <Typography
              className="page-number"
              sx={{
                position: 'absolute',
                bottom: '8mm',
                right: '8mm',
                fontSize: '8pt',
                color: theme.palette.text.secondary,
                fontFamily: '"Roboto Mono", monospace',
              }}
            >
              &lt;/page_2&gt;
            </Typography>
          </Paper>
        </Box> 