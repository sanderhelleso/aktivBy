
<!-- $Id: table_header.xsl 14719 2016-02-10 19:45:46Z sigurdne $ -->
<xsl:template name="table_header">
		<tr class="th">
			<xsl:for-each select="table_header">
				<td class="th_text" width="{with}" align="{align}">
					<xsl:choose>
						<xsl:when test="sort_link!=''">
							<a href="{sort}" onMouseover="window.status='{header}';return true;" onMouseout="window.status='';return true;">
								<xsl:value-of select="header"/>
							</a>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="header"/>
						</xsl:otherwise>
					</xsl:choose>
				</td>
			</xsl:for-each>
		</tr>
</xsl:template>
