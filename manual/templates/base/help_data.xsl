<!-- $Id: help_data.xsl 14728 2016-02-11 22:28:46Z sigurdne $ -->

<xsl:template name="help_data">
	<xsl:apply-templates select="xhelp"/>
</xsl:template>

<xsl:template match="xhelp">
	<table>
		<tr>
			<td>
				<xsl:value-of select="intro" disable-output-escaping="yes"/>
			</td>
		</tr>
		<tr>
			<td>
				<xsl:value-of select="text" disable-output-escaping="yes" />
			</td>
		</tr>
	</table>
</xsl:template>
