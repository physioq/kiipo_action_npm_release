import * as core from '@actions/core'
import * as github from '@actions/github'
import {format} from 'date-fns'
import {version} from '../package.json'
import {basename} from 'path'

const GITHUB_TOKEN = core.getInput('github_token')
const WORKFLOW_FILENAME = core.getInput('workflow_filename')
const ENABLE_OR_DISABLE = core.getInput('enable_or_disable')

const ENDPOINT = {
  DISABLE: 'PUT /repos/{owner}/{repo}/actions/workflows/{workflow_filename}/disable',
  ENABLE: 'PUT /repos/{owner}/{repo}/actions/workflows/{workflow_filename}/enable',
}

export const main = async () => {
  const octokit = github.getOctokit(GITHUB_TOKEN)
  const {payload} = github.context

  const endpoint = ENABLE_OR_DISABLE == 'enable' ? ENDPOINT.ENABLE : ENDPOINT.DISABLE

  await octokit.request(endpoint, {
    owner: payload.organization.login,
    repo: payload.repository.name,
    workflow_filename: WORKFLOW_FILENAME || basename(payload.workflow),
  })

  core.setOutput('version', `v${version.split('.')[2]}`)
}
